# 1️⃣ Build aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Proje dosyasını kopyala (kök dizinde BookFakeApi.csproj olduğu için)
COPY BookFakeApi.csproj ./

# Restore işlemi
RUN dotnet restore

# Tüm kaynak kodu kopyala
COPY . ./

# Yayınla (publish)
RUN dotnet publish -c Release -o /app

# 2️⃣ Çalışma aşaması
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Build aşamasından yayınlanan dosyaları kopyala
COPY --from=build /app ./

# Render'ın verdiği $PORT değişkenini dinle
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}

# Uygulamayı başlat
ENTRYPOINT ["dotnet", "BookFakeApi.dll"]
