FROM python:3.9-slim-bullseye
WORKDIR /app
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 2000
CMD ["gunicorn", "--workers=3", "--bind=0.0.0.0:2000", "app:app"]