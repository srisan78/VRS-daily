# ==========================================
# Stage 1: Build dependencies (Builder)
# ==========================================
FROM python:3.11-slim AS builder

WORKDIR /app

# Install build dependencies (required for some Python packages like psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Create Python wheels for all dependencies to optimize the final image
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# ==========================================
# Stage 2: Runtime (Final Image)
# ==========================================
FROM python:3.11-slim AS runner

WORKDIR /app

# Install runtime dependencies (e.g., libpq for PostgreSQL)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy wheels from the builder stage
COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt .

# Install the pre-built wheels
RUN pip install --no-cache /wheels/*

# Copy the microservice source code
COPY . .

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Expose the port the FastAPI service runs on
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]