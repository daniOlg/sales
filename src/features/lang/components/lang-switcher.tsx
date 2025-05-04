import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from '@/features/lang/hooks/use-translations';

export function LangSwitcher() {
  const { lang, supportedLangs, setLang } = useTranslations();

  const handleLangChange = (value: string) => {
    setLang(value);
  };

  return (
    <div>
      <Select value={lang} onValueChange={handleLangChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a language">
            {lang ? lang.toUpperCase() : 'Select a language'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            {Object.entries(supportedLangs).map(([code, name]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
