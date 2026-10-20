import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const teams = [
  { nameAm: 'አክሊል/እንጦጦ-2', subs: ['ኤልኤል', 'አናኒያ', 'ናኦድ', 'ሩሐማ', 'ኤልዳድ', 'ዮአኪን'] },
  { nameAm: 'መክሊት/እንጦጦ-1', subs: ['ኖላዊሄር', 'ሰናይ', 'ጌራራ', 'በርናባስ', 'መልህቅ'] },
  { nameAm: 'መባ/አለምገና', subs: ['ገብርሔር', 'ማንሔም', 'ማታኒያ', 'ረዳሔም', 'ኤልያቄም', 'አዛሔል'] },
  { nameAm: 'የመንፈስ ፍሬ ልደታ', subs: ['ዮዓዳን', 'ናታኒም', 'አጋፔ', 'ይዲዲያ', 'በኒያስ'] },
  { nameAm: 'የመንፈስ ፍሬ ቆሼ ቆሬ', subs: ['ኒኮኒያ', 'ኤልሮኢ', 'ሮሆቦት'] }
];

async function main() {
  for (const team of teams) {
    const mainTeam = await prisma.mainTeam.upsert({
      where: { id: `seed-${team.nameAm}` },
      update: { nameAm: team.nameAm },
      create: { id: `seed-${team.nameAm}`, nameAm: team.nameAm }
    });
    for (const subName of team.subs) {
      await prisma.subTeam.upsert({
        where: { mainTeamId_nameAm: { mainTeamId: mainTeam.id, nameAm: subName } },
        update: {},
        create: { nameAm: subName, mainTeamId: mainTeam.id }
      });
    }
  }
  console.log('Seeded 5 main teams and 25 subteams.');
}

main()
  .catch((error) => { console.error(error); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); });
