# 1️⃣ Build aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Proje dosyasını kopyala
COPY RecipeApi.csproj ./

# Restore işlemi
RUN dotnet restore RecipeApi.csproj

# Tüm kaynak kodu kopyala
COPY . ./

# Yayınla (publish) — klasörde backend.sln da olduğu için proje dosyası açıkça belirtiliyor
RUN dotnet publish RecipeApi.csproj -c Release -o /app

# 2️⃣ Çalışma aşaması
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Build aşamasından yayınlanan dosyaları kopyala
COPY --from=build /app ./

# Render, PORT değişkenini container'a runtime'da inject eder; ENV satırında
# ${PORT} build-time'da boş kalacağından, shell form ile runtime'da çözüyoruz.
ENV ASPNETCORE_ENVIRONMENT=Production

# Uygulamayı başlat (Render'ın verdiği $PORT'u dinler, yoksa 8080'e düşer)
ENTRYPOINT ["sh", "-c", "ASPNETCORE_URLS=http://0.0.0.0:${PORT:-8080} dotnet RecipeApi.dll"]
