import pytest
from django.core.cache import cache
from rest_framework.test import APIClient

from apps.catalog.models import Branch, Service, ServiceCategory


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture(autouse=True)
def clear_throttle_cache():
    # Throttle counters live in the default cache and would leak across tests.
    cache.clear()


@pytest.fixture
def category(db):
    return ServiceCategory.objects.create(name="Lab Tests", slug="lab-tests")


@pytest.fixture
def service(category):
    return Service.objects.create(
        category=category,
        name="Malaria Test (RDT)",
        slug="malaria-test",
        short_description="Rapid diagnostic test.",
        price=15_000,
    )


@pytest.fixture
def branch(db):
    return Branch.objects.create(
        name="Kampala Road Branch", address="Plot 24, Kampala Road, Kampala"
    )
