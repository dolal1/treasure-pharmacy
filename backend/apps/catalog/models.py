from django.db import models


class Branch(models.Model):
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=32, blank=True)
    maps_embed_url = models.URLField(
        blank=True,
        help_text="Google Maps embed URL for this branch (Share → Embed a map).",
    )
    is_active = models.BooleanField(default=True)
    ordering = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["ordering", "name"]
        verbose_name_plural = "branches"

    def __str__(self):
        return self.name


class ServiceCategory(models.Model):
    name = models.CharField(max_length=80)
    slug = models.SlugField(unique=True)
    blurb = models.CharField(max_length=200, blank=True)
    ordering = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["ordering", "name"]
        verbose_name_plural = "service categories"

    def __str__(self):
        return self.name


class Service(models.Model):
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.PROTECT, related_name="services"
    )
    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=0, help_text="Price in UGX")
    image = models.ImageField(upload_to="services/", blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["category__ordering", "name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    class Category(models.TextChoices):
        MEDICINES = "medicines", "Medicines"
        SUPPLEMENTS = "supplements", "Supplements"
        FIRST_AID = "first-aid", "First Aid"
        PERSONAL_CARE = "personal-care", "Personal Care"
        MOTHER_BABY = "mother-baby", "Mother & Baby"
        DEVICES = "devices", "Medical Devices"

    name = models.CharField(max_length=120)
    category = models.CharField(max_length=20, choices=Category.choices)
    price = models.DecimalField(max_digits=12, decimal_places=0, help_text="Price in UGX")
    stock_qty = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="products/", blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
