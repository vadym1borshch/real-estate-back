import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

const workers = [
  {
    name: 'Johanna Schneider',
    description: 'Seit 18 Jahren in der Steuerberatung tätig und spezialisiert auf steuerliche Fragen rund um Immobilien.',
    phone: '+43 295 730 846',
    email: 'j.schneider@steuerberatung.at',
    address: '1010 Wien',
    photo: 'https://i.pravatar.cc/300?img=1',
  },
  {
    name: 'Markus Huber',
    description: 'Erfahrener Anwalt für Immobilienrecht mit 25 Jahren Berufserfahrung.',
    phone: '+43 198 456 321',
    email: 'm.huber@lawfirm.at',
    address: '4020 Linz',
    photo: 'https://i.pravatar.cc/300?img=2',
  },
  {
    name: 'Anna Lehmann',
    description: 'Sachverständige für Immobilienbewertung mit über 20 Jahren Erfahrung.',
    phone: '+43 677 789 123',
    email: 'a.lehmann@gutachten.at',
    address: '5020 Salzburg',
    photo: 'https://i.pravatar.cc/300?img=3',
  },
  {
    name: 'Thomas Berger',
    description: 'Baumeister mit Expertise in nachhaltigem Wohnbau und Sanierungen.',
    phone: '+43 732 567 890',
    email: 't.berger@bau.at',
    address: '8010 Graz',
    photo: 'https://i.pravatar.cc/300?img=4',
  },
  {
    name: 'Elisabeth Wagner',
    description: 'Architektin spezialisiert auf moderne Wohnkonzepte und Innenraumgestaltung.',
    phone: '+43 512 334 556',
    email: 'e.wagner@architekt.at',
    address: '6020 Innsbruck',
    photo: 'https://i.pravatar.cc/300?img=5',
  },
  {
    name: 'Florian Schmidt',
    description: 'Dachdecker mit Spezialisierung auf energieeffiziente Dachlösungen.',
    phone: '+43 660 998 112',
    email: 'f.schmidt@dach.at',
    address: '9020 Klagenfurt',
    photo: 'https://i.pravatar.cc/300?img=6',
  },
  {
    name: 'Johannes Fischer',
    description: 'Spezialist für Maßküchen mit über 15 Jahren Erfahrung.',
    phone: '+43 650 789 432',
    email: 'j.fischer@kuechen.at',
    address: '3300 Amstetten',
    photo: 'https://i.pravatar.cc/300?img=7',
  },
  {
    name: 'Marie König',
    description: 'Reinigungskraft mit Schwerpunkt auf Haushalts- und Büroreinigung.',
    phone: '+43 699 456 789',
    email: 'm.koenig@clean.at',
    address: '7000 Eisenstadt',
    photo: 'https://i.pravatar.cc/300?img=8',
  },
  {
    name: 'Lukas Mayer',
    description: 'Elektriker mit Spezialisierung auf Smart-Home-Systeme.',
    phone: '+43 676 543 210',
    email: 'l.mayer@elektro.at',
    address: '4600 Wels',
    photo: 'https://i.pravatar.cc/300?img=9',
  },
  {
    name: 'Sebastian Hartmann',
    description: 'Experte für Parkett-, Laminat- und Vinylböden.',
    phone: '+43 699 777 888',
    email: 's.hartmann@boden.at',
    address: '3100 St. Pölten',
    photo: 'https://i.pravatar.cc/300?img=10',
  },
  {
    name: 'Katrin Bauer',
    description: 'Erfahrene Hausmeisterin mit Blick für Ordnung und Sicherheit.',
    phone: '+43 699 234 567',
    email: 'k.bauer@haus.at',
    address: '6800 Feldkirch',
    photo: 'https://i.pravatar.cc/300?img=11',
  },
  {
    name: 'Stefan Huber',
    description: 'Architekt mit Fokus auf nachhaltiges Bauen.',
    phone: '+43 699 555 234',
    email: 's.huber@architekt.at',
    address: '1010 Wien',
    photo: 'https://i.pravatar.cc/300?img=12',
  },
  {
    name: 'Lena Meier',
    description: 'Professionelle Reinigungskraft für Haushalte und Büros.',
    phone: '+43 660 987 654',
    email: 'l.meier@clean.at',
    address: '7000 Eisenstadt',
    photo: 'https://i.pravatar.cc/300?img=13',
  },
  {
    name: 'Patrick König',
    description: 'Elektriker mit Erfahrung in Smart-Home-Systemen.',
    phone: '+43 676 333 222',
    email: 'p.konig@elektro.at',
    address: '4600 Wels',
    photo: 'https://i.pravatar.cc/300?img=14',
  },
  {
    name: 'Julia Hofer',
    description: 'Spezialistin für Küchenmontage und Anpassungen.',
    phone: '+43 660 876 543',
    email: 'j.hofer@kuechen.at',
    address: '3300 Amstetten',
    photo: 'https://i.pravatar.cc/300?img=15',
  },
  {
    name: 'Florian Winkler',
    description: 'Experte für Parkett- und Vinylbodenverlegung.',
    phone: '+43 699 888 777',
    email: 'f.winkler@boden.at',
    address: '3100 St. Pölten',
    photo: 'https://i.pravatar.cc/300?img=16',
  },
  {
    name: 'Martina Steiner',
    description: 'Landschaftsarchitektin mit Fokus auf moderne Gartenkonzepte.',
    phone: '+43 699 222 111',
    email: 'm.steiner@garten.at',
    address: '4020 Linz',
    photo: 'https://i.pravatar.cc/300?img=17',
  },
  {
    name: 'Johann Kurz',
    description: 'Dachdecker mit Spezialisierung auf energieeffiziente Dächer.',
    phone: '+43 699 654 321',
    email: 'j.kurz@dach.at',
    address: '9020 Klagenfurt',
    photo: 'https://i.pravatar.cc/300?img=18',
  },
  {
    name: 'Sandra Leitner',
    description: 'Erfahrene Immobilienverwalterin für Wohnanlagen.',
    phone: '+43 660 987 111',
    email: 's.leitner@immo.at',
    address: '5020 Salzburg',
    photo: 'https://i.pravatar.cc/300?img=19',
  },
  {
    name: 'Maximilian Schmid',
    description: 'Rechtsanwalt für Immobilienrecht mit 15 Jahren Erfahrung.',
    phone: '+43 512 444 333',
    email: 'm.schmid@lawfirm.at',
    address: '1010 Wien',
    photo: 'https://i.pravatar.cc/300?img=20',
  },
  {
    name: 'Nina Weber',
    description: 'Hausmeisterin mit technischem Wissen für kleinere Reparaturen.',
    phone: '+43 660 555 321',
    email: 'n.weber@haus.at',
    address: '6020 Innsbruck',
    photo: 'https://i.pravatar.cc/300?img=21',
  },
  {

    name: 'Benjamin Hofmann',
    description: 'Erfahrener Installateur für Heizungs- und Sanitärsysteme.',
    phone: '+43 676 111 987',
    email: 'b.hofmann@install.at',
    address: '3100 St. Pölten',
    photo: 'https://i.pravatar.cc/300?img=22',
  },
  {
    name: 'Klara Winkler',
    description: 'Spezialistin für Türenmontage und Reparatur.',
    phone: '+43 660 765 432',
    email: 'k.winkler@tueren.at',
    address: '4600 Wels',
    photo: 'https://i.pravatar.cc/300?img=23',
  },
  {
    name: 'Thomas Schuster',
    description: 'Fensterexperte für Montage und Reparatur.',
    phone: '+43 699 333 444',
    email: 't.schuster@fenster.at',
    address: '2700 Wiener Neustadt',
    photo: 'https://i.pravatar.cc/300?img=24',
  },
  {
    name: 'Monika Leitner',
    description: 'Spezialistin für Terrassengestaltung und Außendekoration.',
    phone: '+43 676 555 777',
    email: 'm.leitner@terrassen.at',
    address: '8055 Graz',
    photo: 'https://i.pravatar.cc/300?img=25',
  },
  {
    name: 'Alexander Meier',
    description: 'Experte für Jalousien und Sonnenschutzsysteme.',
    phone: '+43 699 777 888',
    email: 'a.meier@jalousie.at',
    address: '2340 Mödling',
    photo: 'https://i.pravatar.cc/300?img=26',
  },
  {
    name: 'Barbara Steiner',
    description: 'Allround-Handwerkerin für verschiedene Tätigkeiten im Haus und Garten.',
    phone: '+43 676 123 987',
    email: 'b.steiner@handwerk.at',
    address: '4600 Wels',
    photo: 'https://i.pravatar.cc/300?img=27',
  },
  {
    name: 'Michael Novak',
    description: 'Notar mit über 30 Jahren Erfahrung in Immobilienrecht.',
    phone: '+43 512 876 543',
    email: 'm.novak@notar.at',
    address: '1010 Wien',
    photo: 'https://i.pravatar.cc/300?img=28',
  },
  {
    name: 'Gerhard Bauer',
    description: 'Spezialist für Mosaikfliesen und Badsanierungen.',
    phone: '+43 676 555 321',
    email: 'g.bauer@fliesen.at',
    address: '2340 Mödling',
    photo: 'https://i.pravatar.cc/300?img=29',
  },
  {

    name: 'Felix Meier',
    description: 'Innenarchitekt für moderne Wohnraumgestaltung.',
    phone: '+43 660 888 999',
    email: 'f.meier@interior.at',
    address: '8010 Graz',
    photo: 'https://i.pravatar.cc/300?img=30',
  },
  {
    name: 'Maximilian Hofer',
    description: 'Fachmann für Möbelbau und Maßanfertigungen.',
    phone: '+43 699 666 777',
    email: 'm.hofer@tischler.at',
    address: '3100 St. Pölten',
    photo: 'https://i.pravatar.cc/300?img=31',
  },
]


export const serviceWorkersSeed = async () => {
  const professions = await prisma.profession.findMany()
  await prisma.serviceWorker.deleteMany();
  await prisma.serviceWorker.createMany({
    data: workers.map((worker, index) => {
      const profession =
        index < professions.length
          ? professions[index]
          : professions[Math.floor(Math.random() * professions.length)]

      return {
        id: v4(),
        name: worker.name,
        description: worker.description,
        phone: worker.phone,
        email: worker.email,
        address: worker.address,
        photo: worker.photo,
        professionId: profession.id,
      }
    }),
  })
}
