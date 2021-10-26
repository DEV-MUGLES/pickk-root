import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@pickk/common';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/login') {
    return NextResponse.next();
  }

  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error('로그인 안 되어있음');
    }

    const {
      data: { me },
    } = await fetch(process.env.NEXT_PUBLIC_API_URL + '/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ query: GET_ME }),
    }).then(async (response) => await response.json());

    if (!me || me.role !== UserRole.Admin) {
      throw new Error('권한 없음');
    }

    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(`/login?to=${pathname}`);
  }
}

const GET_ME = '{\n  me {\n    role\n  }\n}\n';
