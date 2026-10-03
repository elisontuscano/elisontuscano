import { SectionTitle } from '../components/common/SectionTitle';
import { PaperList } from '../components/Papershelf/PaperList';
import papersData from '../data/papers.json';
import type { Paper } from '../types';

const papers = papersData as Paper[];

export default function PapershelfPage() {
  return (
    <div className="container section">
      <SectionTitle title="Papershelf" />
      <PaperList papers={papers} />
    </div>
  );
}
