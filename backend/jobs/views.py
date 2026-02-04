# jobs/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import JobSerializer

class JobCreateView(APIView):
    def post(self, request):
        data = request.data

        # Case 1: Multiple jobs (list)
        if isinstance(data, list):
            serializer = JobSerializer(data=data, many=True)
        # Case 2: Single job (dict)
        else:
            serializer = JobSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": f"{len(data)} Job(s) created successfull;"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
