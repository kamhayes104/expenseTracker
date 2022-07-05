from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ExpenseSerializer
from .models import Expense
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class ExpenseView(APIView):

    def get(self, request):
        articles = Expense.objects.all()
        serializer = ExpenseSerializer(articles, many=True)
        return Response(serializer.data)

    # @csrf_exempt
    def post(self, request):
        serializer = ExpenseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExpenseDetailView(APIView):

    def get(self, request, pk):
        expense = Expense.objects.get(pk=pk)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data)

    def put(self, request, pk):
        expense = Expense.objects.get(pk=pk)
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        expense = Expense.objects.get(pk=pk)
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
