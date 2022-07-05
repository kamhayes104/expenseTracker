from django.urls import path
from .views import ExpenseView, ExpenseDetailView

urlpatterns = [
    path('api/', ExpenseView.as_view()),
    path('api/<int:pk>/', ExpenseDetailView.as_view())
]
