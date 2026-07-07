"""Seed the database with realistic demo data. Idempotent — safe to re-run."""

from django.core.management.base import BaseCommand

from apps.catalog.models import Branch, Product, Service, ServiceCategory
from apps.content.models import ContentBlock

BRANCHES = [
    {
        "name": "Kampala Road Branch",
        "address": "Plot 24, Kampala Road, Kampala",
        "phone": "+256 700 123 001",
        "maps_embed_url": "https://maps.google.com/maps?q=Kampala+Road,+Kampala,+Uganda&output=embed",
        "ordering": 1,
    },
    {
        "name": "Ntinda Branch",
        "address": "Ntinda Shopping Complex, Ntinda Road, Kampala",
        "phone": "+256 700 123 002",
        "maps_embed_url": "https://maps.google.com/maps?q=Ntinda+Shopping+Complex,+Kampala&output=embed",
        "ordering": 2,
    },
    {
        "name": "Wandegeya Branch",
        "address": "Byaruhanga Road, Wandegeya, Kampala",
        "phone": "+256 700 123 003",
        "maps_embed_url": "https://maps.google.com/maps?q=Wandegeya,+Kampala,+Uganda&output=embed",
        "ordering": 3,
    },
]

CATEGORIES = [
    {
        "slug": "lab-tests",
        "name": "Lab Tests",
        "blurb": "Accurate diagnostics with same-day results for most tests.",
        "ordering": 1,
    },
    {
        "slug": "consultations",
        "name": "Consultations",
        "blurb": "Talk to a licensed medic in person or from home.",
        "ordering": 2,
    },
    {
        "slug": "home-care",
        "name": "Home Care",
        "blurb": "Professional clinical care delivered to your doorstep.",
        "ordering": 3,
    },
    {
        "slug": "bedside-nursing",
        "name": "Bedside Nursing",
        "blurb": "Dedicated nursing support for recovering and elderly patients.",
        "ordering": 4,
    },
]

SERVICES = [
    # slug, name, category, price (UGX), short description
    ("full-blood-count", "Full Blood Count", "lab-tests", 25_000,
     "Comprehensive blood analysis covering red cells, white cells and platelets."),
    ("malaria-test", "Malaria Test (RDT)", "lab-tests", 15_000,
     "Rapid diagnostic test with results in under 20 minutes."),
    ("blood-sugar-test", "Blood Sugar Test", "lab-tests", 10_000,
     "Fasting or random glucose check for diabetes screening and monitoring."),
    ("typhoid-test", "Typhoid Test", "lab-tests", 20_000,
     "Widal antigen test for early typhoid detection."),
    ("hiv-screening", "HIV Screening", "lab-tests", 10_000,
     "Confidential rapid screening with pre- and post-test counselling."),
    ("pregnancy-test", "Pregnancy Test", "lab-tests", 8_000,
     "Clinical urine hCG test with immediate results."),
    ("general-consultation", "General Consultation", "consultations", 30_000,
     "One-on-one session with a licensed clinical officer for any health concern."),
    ("specialist-referral", "Specialist Referral Consultation", "consultations", 50_000,
     "Assessment and referral to the right specialist, with a written referral note."),
    ("nutrition-consultation", "Nutrition Consultation", "consultations", 40_000,
     "Personalised dietary guidance for weight, diabetes, hypertension and more."),
    ("home-nursing-visit", "Home Nursing Visit", "home-care", 60_000,
     "A registered nurse visits your home for assessment, injections or follow-up care."),
    ("medication-delivery", "Medication Delivery & Administration", "home-care", 35_000,
     "Prescriptions delivered and administered correctly at your home."),
    ("wound-care-home", "Wound Care at Home", "home-care", 45_000,
     "Professional wound cleaning, dressing and healing progress checks."),
    ("day-bedside-nursing", "Day Bedside Nursing", "bedside-nursing", 80_000,
     "A dedicated nurse at the bedside during the day, at home or in hospital."),
    ("overnight-bedside-nursing", "Overnight Bedside Nursing", "bedside-nursing", 120_000,
     "Overnight monitoring and care from a registered nurse."),
]

PRODUCTS = [
    ("Paracetamol 500mg (20 tabs)", Product.Category.MEDICINES, 2_000, 250),
    ("Amoxicillin 250mg (21 caps)", Product.Category.MEDICINES, 8_000, 120),
    ("ORS Sachets (pack of 10)", Product.Category.MEDICINES, 1_500, 300),
    ("Malaria Test Kit (self-test)", Product.Category.FIRST_AID, 12_000, 80),
    ("First Aid Kit (family size)", Product.Category.FIRST_AID, 45_000, 25),
    ("Digital Thermometer", Product.Category.DEVICES, 25_000, 40),
    ("Blood Pressure Monitor", Product.Category.DEVICES, 150_000, 15),
    ("Vitamin C 1000mg (30 tabs)", Product.Category.SUPPLEMENTS, 12_000, 90),
    ("Prenatal Multivitamins (30 tabs)", Product.Category.MOTHER_BABY, 18_000, 60),
    ("Hand Sanitizer 500ml", Product.Category.PERSONAL_CARE, 9_000, 150),
]

CONTENT_BLOCKS = [
    ("home-hero-heading", "Homepage hero heading",
     "Your health, delivered with care."),
    ("home-hero-subheading", "Homepage hero subheading",
     "Book lab tests, consultations and home care from Kampala's trusted pharmacy — "
     "online, in minutes."),
    ("home-announcement", "Homepage announcement bar",
     "Free delivery within Kampala for orders above UGX 100,000."),
    ("about-intro", "About page intro",
     "Treasure Pharmacy has served Kampala for over a decade, combining licensed "
     "pharmaceutical care with a modern digital clinic. Our team of pharmacists, "
     "clinical officers and nurses brings quality healthcare to your neighbourhood — "
     "and now, to your screen."),
    ("whatsapp-number", "WhatsApp number (digits only, international format)",
     "256700123000"),
]


class Command(BaseCommand):
    help = "Seed demo branches, services, products and content blocks."

    def handle(self, *args, **options):
        for data in BRANCHES:
            Branch.objects.update_or_create(name=data["name"], defaults=data)

        categories = {}
        for data in CATEGORIES:
            categories[data["slug"]], _ = ServiceCategory.objects.update_or_create(
                slug=data["slug"], defaults=data
            )

        for slug, name, category_slug, price, short_description in SERVICES:
            Service.objects.update_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "category": categories[category_slug],
                    "price": price,
                    "short_description": short_description,
                },
            )

        for name, category, price, stock_qty in PRODUCTS:
            Product.objects.update_or_create(
                name=name,
                defaults={"category": category, "price": price, "stock_qty": stock_qty},
            )

        for key, label, text in CONTENT_BLOCKS:
            block, created = ContentBlock.objects.get_or_create(
                key=key, defaults={"label": label, "text": text}
            )
            if not created and not block.text:
                block.text = text
                block.save(update_fields=["text"])

        self.stdout.write(self.style.SUCCESS(
            f"Seeded: {Branch.objects.count()} branches, "
            f"{Service.objects.count()} services, "
            f"{Product.objects.count()} products, "
            f"{ContentBlock.objects.count()} content blocks."
        ))
