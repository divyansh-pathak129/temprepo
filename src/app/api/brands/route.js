import { NextResponse } from 'next/server';

const brands = [
  // Row 1
  { name: "Maybelline New York", link: "/brands/maybelline" },
  { name: "Lakme", link: "/brands/lakme" },
  { name: "Nykaa Cosmetics", link: "/brands/nykaa-cosmetics" },
  { name: "M.A.C", link: "/brands/mac" },
  // Row 2
  { name: "The Face Shop", link: "/brands/face-shop" },
  { name: "L'Oreal Paris", link: "/brands/loreal" },
  { name: "Nykaa Naturals", link: "/brands/nykaa-naturals" },
  { name: "Biotique", link: "/brands/biotique" },
  // Row 3
  { name: "Huda Beauty", link: "/brands/huda-beauty" },
  { name: "Kama Ayurveda", link: "/brands/kama-ayurveda" },
  { name: "Innisfree", link: "/brands/innisfree" },
  { name: "The Body Shop", link: "/brands/body-shop" },
  // Row 4
  { name: "18.21 Man Made", link: "/brands/1821-man-made" },
  { name: "2.Oh", link: "/brands/2-oh" },
  { name: "23 Yards", link: "/brands/23-yards" },
  { name: "24 Mantra", link: "/brands/24-mantra" },
  // Row 5
  { name: "3003BC", link: "/brands/3003bc" },
  { name: "360 Block", link: "/brands/360-block" },
  { name: "3TENX", link: "/brands/3tenx" },
  { name: "4711", link: "/brands/4711" },
  // Row 6
  { name: "5 Elements by Radhika Gupta", link: "/brands/5-elements" },
  { name: "50AP", link: "/brands/50ap" },
  { name: "513", link: "/brands/513" },
  { name: "52 Sundaze", link: "/brands/52-sundaze" },
  // Row 7
  { name: "7-10", link: "/brands/7-10" },
  { name: "7th Heaven", link: "/brands/7th-heaven" },
  { name: "90 Feet By Dharavi Market", link: "/brands/90-feet" },
  { name: "A Big Indian Story", link: "/brands/big-indian-story" },
  // Row 8
  { name: "A Clutch Story", link: "/brands/clutch-story" },
  { name: "A Fragrance Story", link: "/brands/fragrance-story" },
  { name: "A'kin", link: "/brands/akin" },
  { name: "Aadita", link: "/brands/aadita" },
  // Row 9
  { name: "AANCHAL SAYAL", link: "/brands/aanchal-sayal" },
  { name: "AAPNO RAJASTHAN", link: "/brands/aapno-rajasthan" },
  { name: "Aaranyaa", link: "/brands/aaranyaa" },
  { name: "Aaruvi Ruchi Verma", link: "/brands/aaruvi-ruchi-verma" },
  // Row 10
  { name: "Aastey", link: "/brands/aastey" },
  { name: "Aatmana", link: "/brands/aatmana" },
  { name: "Abdesigns", link: "/brands/abdesigns" },
  { name: "ABELARDO DE MODA", link: "/brands/abelardo-de-moda" },
];

export async function GET() {
  try {
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
} 