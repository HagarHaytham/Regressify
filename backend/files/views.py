from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework import status
import pandas as pd
from sklearn.linear_model import LinearRegression
import io

class LinearRegressionView(APIView):

    parser_classes = (FileUploadParser,)

    def post(self, request, format=None):
        # if 'file' not in request.FILES:
        #     return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uploaded_file = request.FILES.get('file')  # Get the single uploaded file
            print(uploaded_file)
            if uploaded_file:
                uploaded_file_name = uploaded_file.name
                uploaded_file_content = uploaded_file.read()

                n_lines = uploaded_file_content.decode('utf-8').split("\r\n\r\n", 1)[1]  # Split at the first double newline
                lines = n_lines.rstrip().splitlines()
                csv_data = "\n".join(lines[:-1])  # Join cleaned lines back into a string
                # print(csv_data)

                df = pd.read_csv(io.StringIO(csv_data))
                print(df)
                X = df[['SAT']]
                y = df['GPA']
                # Perform linear regression
                model = LinearRegression()
                model.fit(X, y)

                # Get regression coefficients and intercept
                coefficients = model.coef_
                intercept = model.intercept_

                print(intercept)
                # # Prepare response
                response_data = {
                    'coefficients': coefficients.tolist(),
                    'intercept': intercept,
                    'message': 'Linear regression completed successfully',
                }
                return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = str(e)
            return Response({'status': 'error', 'message': error_message})

        # except Exception as e:
        #     return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
