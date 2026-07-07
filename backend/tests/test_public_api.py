import pytest
from django.core.management import call_command


@pytest.mark.django_db
def test_seed_and_public_endpoints(api_client):
    call_command("seed_demo")
    call_command("seed_demo")  # idempotent — re-running must not duplicate

    branches = api_client.get("/api/branches/")
    assert branches.status_code == 200
    assert len(branches.data) == 3

    categories = api_client.get("/api/service-categories/")
    assert categories.status_code == 200
    assert [c["slug"] for c in categories.data] == [
        "lab-tests",
        "consultations",
        "home-care",
        "bedside-nursing",
    ]
    assert all(len(c["services"]) > 0 for c in categories.data)

    detail = api_client.get("/api/services/malaria-test/")
    assert detail.status_code == 200
    assert detail.data["category"] == "lab-tests"

    products = api_client.get("/api/products/")
    assert products.status_code == 200
    assert len(products.data) == 10
    assert all(p["in_stock"] for p in products.data)

    content = api_client.get("/api/content/")
    assert content.status_code == 200
    keys = {block["key"] for block in content.data}
    assert {"home-hero-heading", "whatsapp-number"} <= keys


@pytest.mark.django_db
def test_inactive_items_are_hidden(api_client, service, branch):
    service.is_active = False
    service.save()
    branch.is_active = False
    branch.save()

    assert api_client.get("/api/services/").data == []
    assert api_client.get("/api/branches/").data == []
    assert api_client.get("/api/services/malaria-test/").status_code == 404
