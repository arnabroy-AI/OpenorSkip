import React, { useState } from 'react';
import { Persona, TitleResult } from '../types.ts';
import { Search, Filter, CheckCircle2, XCircle, AlertCircle, UserCheck } from 'lucide-react';

interface PersonaPanelProps {
  personas: Persona[];
  titles: string[];
  titleResults: TitleResult[];
  activeFilter?: 'all' | 'open' | 'skip' | 'confused';
  winnerIndex: number;
}

export const PersonaPanel: React.FC<PersonaPanelProps> = ({
  personas,
  titles,
  titleResults,
  activeFilter = 'all',
  winnerIndex
}) => {
  const [filterState, setFilterState] = useState<'all' | 'open' | 'skip' | 'confused'>(activeFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(personas[0] || null);

  const filteredPersonas = personas.filter((p) => {
    // Search filter
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mrr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.primaryInterest.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Decision filter relative to winner index
    if (filterState === 'all') return true;
    const decision = p.decisions?.find((d) => d.titleIndex === winnerIndex);
    if (!decision) return true;
    return decision.action === filterState;
  });

  return (
    <div className="w-full space-y-6">
      
      {/* Top Description Bar */}
      <div className="rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e0e0e0]/70 pb-5">
          <div>
            <div className="text-[13px] font-semibold tracking-wider uppercase text-[#0066cc] mb-1">
              Audience Specialization
            </div>
            <h2 className="text-[26px] font-semibold text-[#1b1b1d] tracking-tight">
              The 40 Founder Personas Panel
            </h2>
            <p className="text-[15px] text-[#7a7a7a] mt-1 max-w-2xl">
              Unlike broad models that simulate 10,000 generic internet strangers, every persona here is an active bootstrapped founder who guards their inbox ruthlessly.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-[#414753]">
            <span className="font-semibold tabular-nums text-[#0066cc]">{personas.length} Active Personas</span>
            <span>·</span>
            <span>Bootstrapped ARR $0–$50k</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Segmented Filter Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f5f5f7] rounded-full border border-[#e0e0e0]/60 w-full sm:w-auto">
            <button
              onClick={() => setFilterState('all')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                filterState === 'all'
                  ? 'bg-white text-[#1b1b1d] shadow-sm font-semibold'
                  : 'text-[#7a7a7a] hover:text-[#1b1b1d]'
              }`}
            >
              All ({personas.length})
            </button>
            <button
              onClick={() => setFilterState('open')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                filterState === 'open'
                  ? 'bg-white text-[#0066cc] shadow-sm font-semibold'
                  : 'text-[#7a7a7a] hover:text-[#0066cc]'
              }`}
            >
              Opened Winner ({personas.filter(p => p.decisions?.find(d => d.titleIndex === winnerIndex)?.action === 'open').length})
            </button>
            <button
              onClick={() => setFilterState('skip')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                filterState === 'skip'
                  ? 'bg-white text-[#1b1b1d] shadow-sm font-semibold'
                  : 'text-[#7a7a7a] hover:text-[#1b1b1d]'
              }`}
            >
              Skipped ({personas.filter(p => p.decisions?.find(d => d.titleIndex === winnerIndex)?.action === 'skip').length})
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7a7a7a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search founder, MRR, interest..."
              className="w-full h-[38px] pl-9 pr-3 text-[13px] rounded-full bg-[#fafafc] border border-[#e0e0e0] placeholder-[#7a7a7a]/60 focus:bg-white focus:border-[#0071e3] outline-none"
            />
          </div>

        </div>
      </div>

      {/* Grid of Personas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Persona List Grid (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[720px] overflow-y-auto pr-1">
          {filteredPersonas.map((persona) => {
            const isSelected = selectedPersona?.id === persona.id;
            const winnerDecision = persona.decisions?.find(d => d.titleIndex === winnerIndex);

            return (
              <div
                key={persona.id}
                onClick={() => setSelectedPersona(persona)}
                className={`rounded-[14px] p-4 transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-2 border-[#0066cc] bg-[#ffffff]'
                    : 'border-[#e0e0e0] bg-[#ffffff] hover:border-[#7a7a7a]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 rounded-full object-cover border border-[#e0e0e0]"
                      onError={(e) => {
                        // Resilient fallback
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#1b1b1d] leading-tight">
                        {persona.name}
                      </h4>
                      <p className="text-[12px] text-[#7a7a7a]">
                        {persona.role} · <span className="font-semibold text-[#1b1b1d]">{persona.mrr}</span>
                      </p>
                    </div>
                  </div>

                  {/* Decision Tag */}
                  {winnerDecision && (
                    <span
                      className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        winnerDecision.action === 'open'
                          ? 'bg-[#0066cc]/10 text-[#0066cc]'
                          : winnerDecision.action === 'confused'
                          ? 'bg-[#f0edef] text-[#7a7a7a]'
                          : 'bg-[#1b1b1d]/5 text-[#7a7a7a]'
                      }`}
                    >
                      {winnerDecision.action}
                    </span>
                  )}
                </div>

                <div className="text-[12px] text-[#414753] line-clamp-2 mt-2 bg-[#fafafc] p-2.5 rounded-[8px] border border-[#e0e0e0]/50">
                  <span className="font-semibold text-[#1b1b1d]">Reaction: </span>
                  &ldquo;{winnerDecision?.reason || persona.primaryInterest}&rdquo;
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#7a7a7a]">
                  <span>Focus: {persona.primaryInterest}</span>
                  <span className="font-mono uppercase">{persona.timeSensitivity} time</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Persona Deep Inspection Card (4 cols) */}
        <div className="lg:col-span-4">
          {selectedPersona ? (
            <div className="sticky top-20 rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] p-6 space-y-5">
              
              <div className="flex items-center gap-3.5 border-b border-[#e0e0e0]/70 pb-4">
                <img
                  src={selectedPersona.avatar}
                  alt={selectedPersona.name}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-full object-cover border border-[#e0e0e0]"
                />
                <div>
                  <h3 className="text-[18px] font-semibold text-[#1b1b1d]">
                    {selectedPersona.name}
                  </h3>
                  <div className="text-[13px] text-[#7a7a7a]">
                    {selectedPersona.role}
                  </div>
                  <div className="text-[13px] font-semibold text-[#0066cc] mt-0.5">
                    {selectedPersona.mrr}
                  </div>
                </div>
              </div>

              {/* Persona Attributes */}
              <div className="space-y-3 text-[13px]">
                <div className="flex items-center justify-between py-1 border-b border-[#e0e0e0]/40">
                  <span className="text-[#7a7a7a]">Time Sensitivity:</span>
                  <span className="font-semibold text-[#1b1b1d] capitalize">{selectedPersona.timeSensitivity}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#e0e0e0]/40">
                  <span className="text-[#7a7a7a]">Skepticism Level:</span>
                  <span className="font-semibold text-[#1b1b1d] capitalize">{selectedPersona.skepticism} (Allergic to fluff)</span>
                </div>

                <div className="py-1 border-b border-[#e0e0e0]/40">
                  <span className="text-[#7a7a7a] block mb-1">Primary Problem:</span>
                  <span className="font-medium text-[#1b1b1d]">{selectedPersona.primaryInterest}</span>
                </div>
              </div>

              {/* Gut Reaction Comparison for all titles */}
              <div className="space-y-3 pt-2">
                <div className="text-[12px] font-semibold uppercase text-[#7a7a7a]">
                  Reactions to your options:
                </div>

                {titles.map((title, tIdx) => {
                  const letter = String.fromCharCode(65 + tIdx);
                  const decision = selectedPersona.decisions?.find(d => d.titleIndex === tIdx);
                  const isOpen = decision?.action === 'open';

                  return (
                    <div
                      key={tIdx}
                      className={`p-3 rounded-[10px] border text-[12px] ${
                        isOpen
                          ? 'border-[#0066cc]/30 bg-[#0066cc]/5'
                          : 'border-[#e0e0e0] bg-[#fafafc]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-[#1b1b1d]">Option {letter}</span>
                        <span
                          className={`font-bold uppercase text-[10px] px-1.5 py-0.5 rounded-full ${
                            isOpen ? 'bg-[#0066cc] text-white' : 'bg-[#7a7a7a] text-white'
                          }`}
                        >
                          {decision?.action || 'skip'}
                        </span>
                      </div>
                      <p className="text-[#414753] italic">
                        &ldquo;{decision?.reason || (isOpen ? 'Sounds specific and relevant' : 'Too vague, skipping.')}&rdquo;
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            <div className="rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] p-8 text-center text-[#7a7a7a]">
              Select a founder to inspect their inbox profile.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
