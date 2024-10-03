import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

// import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Search } from '@src/components/features/search';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            {/* <BlogLogo /> */}
            <Image src="/assets/logo-accor.webp" alt="logo" width={180} height={50} />
          </Link>
          <div className="flex items-center gap-4">
            <Search />
            <LanguageSelector />
          </div>
        </Container>
      </nav>
    </header>
  );
};
