import { redirect } from 'next/navigation';
import { WEB_APP_PATH } from '@/lib/config';

export default function HomePage() {
  redirect(WEB_APP_PATH);
}
