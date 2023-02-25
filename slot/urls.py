from django.urls import path
from . import views

urlpatterns = [
    path('view/<slug:model>/<slug:role>', views.SlotView.as_view()),
]
