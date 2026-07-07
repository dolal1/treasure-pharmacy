import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { ApiError } from "../api/client";
import { useBranches, useCreateBooking, useServiceCategories } from "../api/hooks";
import type { BookingResponse } from "../api/types";
import { CheckCircleIcon } from "../components/icons";
import { HOME_VISIT_CATEGORIES } from "../lib/categories";
import { formatUGX } from "../lib/format";

const schema = z
  .object({
    full_name: z.string().min(2, "Please enter your full name"),
    email: z.email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^\+?[\d\s]{9,15}$/, "Enter a valid phone number, e.g. +256 700 123 456"),
    service: z.string().min(1, "Choose a service"),
    branch: z.string().min(1, "Choose a branch, or select a home visit"),
    home_address: z.string(),
    preferred_date: z.string().min(1, "Pick a date"),
    preferred_time: z.string().min(1, "Pick a time"),
    notes: z.string().max(1000, "Keep notes under 1000 characters"),
  })
  .superRefine((values, ctx) => {
    if (values.branch === "home" && values.home_address.trim().length < 5) {
      ctx.addIssue({
        code: "custom",
        path: ["home_address"],
        message: "Tell us where to find you for the home visit",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

function todayISO(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 " +
  "placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 focus:outline-none";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-rose-600">{message}</p>;
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { data: categories } = useServiceCategories();
  const { data: branches } = useBranches();
  const createBooking = useCreateBooking();
  const [confirmed, setConfirmed] = useState<BookingResponse | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const services = useMemo(
    () => (categories ?? []).flatMap((category) => category.services),
    [categories],
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      service: searchParams.get("service") ?? "",
      branch: "",
      home_address: "",
      preferred_date: "",
      preferred_time: "",
      notes: "",
    },
  });

  const selectedSlug = watch("service");
  const selectedBranch = watch("branch");
  const selectedService = services.find((s) => s.slug === selectedSlug);
  const isHomeService = selectedService
    ? HOME_VISIT_CATEGORIES.has(selectedService.category)
    : false;

  // Home-care services happen at the client's home — preselect the home visit.
  useEffect(() => {
    if (isHomeService && selectedBranch === "") {
      setValue("branch", "home");
    }
  }, [isHomeService, selectedBranch, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setGeneralError(null);
    try {
      const booking = await createBooking.mutateAsync({
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        service: values.service,
        branch: values.branch === "home" ? null : Number(values.branch),
        home_address: values.branch === "home" ? values.home_address : "",
        preferred_date: values.preferred_date,
        preferred_time: values.preferred_time,
        notes: values.notes,
      });
      setConfirmed(booking);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 429) {
          setGeneralError(
            "You've submitted several bookings recently. Please wait a little and try again, or reach us on WhatsApp.",
          );
          return;
        }
        let mapped = false;
        for (const [field, messages] of Object.entries(error.fields)) {
          if (field in schema.shape && Array.isArray(messages)) {
            setError(field as keyof FormValues, { message: messages[0] });
            mapped = true;
          }
        }
        if (!mapped) {
          setGeneralError("Something went wrong submitting your booking. Please try again.");
        }
      } else {
        setGeneralError(
          "We couldn't reach the booking service. Check your connection and try again.",
        );
      }
    }
  });

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-teal-600" />
        <h1 className="mt-6 text-3xl font-bold text-slate-900">Booking received!</h1>
        <p className="mt-3 text-lg text-slate-600">Your reference number is</p>
        <p className="mt-2 inline-block rounded-lg bg-teal-50 px-6 py-3 text-2xl font-bold tracking-wider text-teal-700">
          {confirmed.reference}
        </p>
        <p className="mx-auto mt-6 max-w-md text-slate-600">
          A confirmation email is on its way to <strong>{confirmed.email}</strong>. Our team
          will call you shortly to confirm your appointment.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              reset();
              setConfirmed(null);
            }}
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:border-teal-600 hover:text-teal-700"
          >
            Book another service
          </button>
          <Link
            to="/"
            className="rounded-lg bg-teal-600 px-5 py-2.5 font-semibold text-white hover:bg-teal-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">Book a service</h1>
        <p className="mt-4 text-lg text-slate-600">
          Fill in the form and you'll get an instant reference number plus an email
          confirmation. No payment needed to book.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          {generalError && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {generalError}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="full_name" className="font-medium text-slate-700">
                Full name
              </label>
              <input
                id="full_name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Akello Grace"
                className={inputClass}
                {...register("full_name")}
              />
              <FieldError message={errors.full_name?.message} />
            </div>
            <div>
              <label htmlFor="phone" className="font-medium text-slate-700">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+256 700 123 456"
                className={inputClass}
                {...register("phone")}
              />
              <FieldError message={errors.phone?.message} />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div>
            <label htmlFor="service" className="font-medium text-slate-700">
              Service
            </label>
            <select id="service" className={inputClass} {...register("service")}>
              <option value="">Choose a service…</option>
              {(categories ?? []).map((category) => (
                <optgroup key={category.slug} label={category.name}>
                  {category.services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name} — {formatUGX(service.price)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <FieldError message={errors.service?.message} />
          </div>

          <div>
            <label htmlFor="branch" className="font-medium text-slate-700">
              Where should we see you?
            </label>
            <select id="branch" className={inputClass} {...register("branch")}>
              <option value="">Choose…</option>
              {(branches ?? []).map((branch) => (
                <option key={branch.id} value={String(branch.id)}>
                  {branch.name} — {branch.address}
                </option>
              ))}
              <option value="home">Home visit — we come to you</option>
            </select>
            <FieldError message={errors.branch?.message} />
          </div>

          {selectedBranch === "home" && (
            <div>
              <label htmlFor="home_address" className="font-medium text-slate-700">
                Home address
              </label>
              <input
                id="home_address"
                type="text"
                placeholder="e.g. Plot 5, Ntinda Road, Kampala"
                className={inputClass}
                {...register("home_address")}
              />
              <FieldError message={errors.home_address?.message} />
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="preferred_date" className="font-medium text-slate-700">
                Preferred date
              </label>
              <input
                id="preferred_date"
                type="date"
                min={todayISO()}
                className={inputClass}
                {...register("preferred_date")}
              />
              <FieldError message={errors.preferred_date?.message} />
            </div>
            <div>
              <label htmlFor="preferred_time" className="font-medium text-slate-700">
                Preferred time
              </label>
              <input
                id="preferred_time"
                type="time"
                className={inputClass}
                {...register("preferred_time")}
              />
              <FieldError message={errors.preferred_time?.message} />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="font-medium text-slate-700">
              Notes for our team <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Anything we should know — symptoms, medication, access directions…"
              className={inputClass}
              {...register("notes")}
            />
            <FieldError message={errors.notes?.message} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Submitting…" : "Confirm booking"}
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-24">
          <h2 className="font-semibold text-slate-900">Your booking</h2>
          {selectedService ? (
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Service</dt>
                <dd className="font-medium text-slate-900">{selectedService.name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Category</dt>
                <dd className="font-medium text-slate-900">{selectedService.category_name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Price</dt>
                <dd className="text-lg font-bold text-teal-700">
                  {formatUGX(selectedService.price)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Choose a service to see its details here.
            </p>
          )}
          <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
            You pay at the branch or on completion of the visit. Booking is free and our team
            confirms every appointment by phone.
          </p>
        </aside>
      </div>
    </div>
  );
}
