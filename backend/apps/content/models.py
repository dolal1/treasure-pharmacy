from django.db import models


class ContentBlock(models.Model):
    """An admin-editable piece of site copy or imagery, addressed by key."""

    key = models.SlugField(
        unique=True,
        help_text="Stable identifier the frontend looks up, e.g. 'home-hero-heading'.",
    )
    label = models.CharField(max_length=120, help_text="What this block is, for admin users.")
    text = models.TextField(blank=True)
    image = models.ImageField(upload_to="content/", blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["key"]

    def __str__(self):
        return self.label or self.key
