import type { User } from '@/features/users/types';

const baseUrl = process.env.REQRES_BASE_URL ?? 'https://reqres.in';
const apiKey = process.env.REQRES_API_KEY;

type ReqResResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

async function fetchPage(page: number): Promise<ReqResResponse> {
  const headers: HeadersInit = { Accept: 'application/json' };
  if (apiKey) headers['x-api-key'] = apiKey;

  const response = await fetch(`${baseUrl}/api/users?page=${page}`, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`ReqRes returned ${response.status}`);
  return response.json() as Promise<ReqResResponse>;
}

export async function fetchAllUsers(): Promise<User[]> {
  const firstPage = await fetchPage(1);
  const remainingPages = Array.from(
    { length: Math.max(0, firstPage.total_pages - 1) },
    (_, index) => index + 2,
  );

  const pages = await Promise.all(remainingPages.map(fetchPage));
  return [firstPage, ...pages].flatMap((page) => page.data);
}
