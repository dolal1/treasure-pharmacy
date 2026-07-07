from rest_framework import generics

from .models import ContentBlock
from .serializers import ContentBlockSerializer


class ContentBlockListView(generics.ListAPIView):
    queryset = ContentBlock.objects.all()
    serializer_class = ContentBlockSerializer
