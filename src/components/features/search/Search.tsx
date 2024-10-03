import { algoliasearch } from 'algoliasearch';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
);

export const Search = () => {
  const { locale } = useRouter();

  const { t } = useTranslation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="relative w-full max-w-lg">
      <InstantSearch searchClient={searchClient} indexName="posts">
        <SearchBox
          onFocus={() => setIsSearchOpen(true)}
          onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
          placeholder={t('search.placeholder')}
          searchAsYouType={true}
          classNames={{
            root: '',
            form: '',
            input: 'px-4 py-2',
            submitIcon: '',
          }}
          submitIconComponent={() => null}
          resetIconComponent={() => null}
        />
        {isSearchOpen && (
          <div className="absolute right-0 z-50 mt-2 w-[24vw] max-w-3xl rounded-lg bg-colorWhite shadow-lg">
            <Hits hitComponent={props => <Hit {...props} locale={locale} t={t} />} />
          </div>
        )}
      </InstantSearch>
    </div>
  );
};

const Hit = ({ hit, locale = 'en-US', t }) => {
  const title = hit.fields.title[locale];
  const subtitle = hit.fields.subtitle[locale];
  const slug = hit.fields.slug['en-US'];

  return (
    <div className="border-gray-200 hover:bg-gray-100 border-b p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{subtitle.substring(0, 100)}...</p>
      <a href={`/${locale}/${slug}`} className="text-blue-500 hover:underline">
        {t('search.readMore')}
      </a>
    </div>
  );
};
