"""Validate the restructured pages without changing the original file hashes."""
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
docs=(ROOT/'index.html').read_text(encoding='utf-8')
rules=(ROOT/'rules/index.html').read_text(encoding='utf-8')
for key in ['data-settlement-tab','data-settlement-panel','data-form-type','href="rules/"']:
    assert key in docs,key
for key in ['id="rules"','id="submit"','id="documents"','data-preflight-check','id="docAdvisor"','간담회 자료.pptx']:
    assert key in rules,key
assert 'osan-club-submission-checklist-2026-2' in (ROOT/'assets/js/checklist.js').read_text(encoding='utf-8')
assert "SETTLEMENT_FORMS" in (ROOT/'assets/js/advisor.js').read_text(encoding='utf-8')
assert "location.replace" in docs
assert 'target="_blank" rel="noopener noreferrer"' in docs and 'target="_blank" rel="noopener noreferrer"' in rules
print('PASS: distinct pages, legacy navigation, checklist and advisor are preserved')
