# የፍኖተ ፅድቅ በጎ አድራጎት ማኅበር
Bilingual beneficiary-management system — Phase 1 starter.

## Stack
- `mobile/`: Expo + React Native + TypeScript
- `backend/`: Express + TypeScript + Prisma
- Database: PostgreSQL
- Source control: GitHub

> This is a development starter, not a production-ready deployment. Do not enter real beneficiary health, bank, or home-location data until authentication, authorization, privacy controls, backups, and deployment security are implemented and tested.

## Requirements on Windows 10/11
Install:
1. Node.js LTS (includes npm)
2. Git for Windows
3. PostgreSQL 16+ (or use a trusted managed PostgreSQL provider)
4. Expo Go on an Android phone for the first UI test
5. Android Studio later, if you want a local Android emulator

Verify in PowerShell:
```powershell
node -v
npm -v
git --version
```

## 1. Start PostgreSQL
Create a database named `finote_tsidik`. You can use pgAdmin or psql.
Example with psql:
```sql
CREATE USER finote_app WITH PASSWORD 'replace-with-a-local-dev-password';
CREATE DATABASE finote_tsidik OWNER finote_app;
```
Use a local development password only. Never commit real secrets to GitHub.

## 2. Configure and start the backend
Open PowerShell:
```powershell
cd finote-tsidik\backend
Copy-Item .env.example .env
```
Edit `backend\.env` and set `DATABASE_URL` to your local PostgreSQL connection. Example:
`postgresql://finote_app:YOUR_PASSWORD@localhost:5432/finote_tsidik?schema=public`

Then:
```powershell
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```
Backend runs at `http://localhost:4000`.
Check `http://localhost:4000/health` and `http://localhost:4000/health/db`.

## 3. Start the mobile app
In a second PowerShell window:
```powershell
cd finote-tsidik\mobile
npm install
```
Find your Windows computer's LAN IPv4 address using `ipconfig`. Your phone and computer must be on the same Wi-Fi for a local phone test.
Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` to:
`http://YOUR_COMPUTER_LAN_IP:4000`
Example only: `http://192.168.1.20:4000`

Then:
```powershell
npx expo start
```
Scan the QR code with Expo Go. If Windows Firewall asks, allow Node.js on your private network. Do not expose this development API to the public internet.

## 4. GitHub workflow
Create an empty private repository on GitHub, then from the project root:
```powershell
git init
git add .
git commit -m "Initial Phase 1 foundation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
On your second computer, install Node.js and Git, then:
```powershell
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```
Use branches and commit changes regularly. Keep `.env` files out of Git.

## What Phase 1 contains
- Amharic/English language toggle (current selection is UI state only; persistence comes in a later phase)
- Public welcome page and login entry placeholder
- Backend liveness endpoint and PostgreSQL connectivity endpoint
- Prisma schema for the initial organization structure and future records
- Seed script for the five main teams and 25 subteams

## Next phases
1. Authentication, password hashing, sessions, RBAC and scope enforcement
2. Team/member/beneficiary CRUD and audit history
3. Health/living condition history and suggested-beneficiary workflow
4. CBE/cash payments, 45-day cycles, receipts and reports
5. Media/links, testing, backups, deployment and Android release build
