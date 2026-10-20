"""Validate exact user-supplied HWP files and their download links."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote
import hashlib

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
  "[서식5호] 법인카드 사용 승인요청서(전공).hwp": "11a55329235baeeb8e16aa1aadfe2edd748f0c70457930a2f172e8e6fbf45d67",
  "[서식5호] 법인카드 사용 승인요청서(취업).hwp": "7874cc1ca31dadc6159b8c79972f82feb47b0f2db985371acab3f978c8cd3b14",
  "[서식6호] 영수증 붙임 철(전공).hwp": "727806daee992f74596dbccca003906c4f79fc3ec07aa0269d2ee5d6c8d40ef1",
  "[서식6호] 영수증 붙임 철(취업).hwp": "e9259db21921abd74e2802fc794d57561ef7a746d5655add9572886d3f13e642",
  "[서식7호] 검수 조서(전공).hwp": "e3b86a931e93f59638b9514a3bd581f03f96a99ac29057a2054c9e95e2e04595",
  "[서식7호] 검수 조서(취업).hwp": "c578657aa6b718d63d318ac967537809f3a048e51ccf29e7e7471ae85f27bf1c"
}
MAGIC = bytes.fromhex("d0cf11e0a1b11ae1")

class Downloads(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        if tag != "a":
            return
        a = dict(attrs)
        if "form-download" in a.get("class", "").split():
            self.links.append(a)

page = (ROOT / "index.html").read_text(encoding="utf-8")
links = Downloads()
links.feed(page)
assert len(links.links) == 6, f"Expected 6 HWP download links, found {len(links.links)}"
seen = set()
for link in links.links:
    path = unquote(link["href"])
    filename = Path(path).name
    expected_digest = EXPECTED[filename]
    assert path.startswith("files/"), path
    assert link.get("download") == filename, filename
    assert link.get("data-form-type") in ("major", "employment")
    assert ("(전공)" in filename) == (link["data-form-type"] == "major"), filename
    assert filename not in seen, f"Duplicate link: {filename}"
    seen.add(filename)
    local = ROOT / path
    assert local.exists(), f"Missing original HWP file: {local}"
    raw = local.read_bytes()
    assert raw.startswith(MAGIC), f"Not a traditional HWP binary: {filename}"
    assert hashlib.sha256(raw).hexdigest() == expected_digest, f"File changed: {filename}"
assert set(EXPECTED) == seen
assert not (ROOT / "files" / "영수증 붙임철&검수조서(전공).hwpx").exists(), "Outdated major HWPX must be removed"
assert not (ROOT / "files" / "영수증 붙임철&검수조서(취업).hwpx").exists(), "Outdated employment HWPX must be removed"
assert (ROOT / "files" / "2026학년도 2학기 간담회 자료.pptx").exists(), "Existing briefing PPTX must remain"
assert "영수증 붙임철&amp;검수조서" not in page, "Outdated combined HWPX download still shown"
assert "data-settlement-tab" in page and "data-settlement-panel" in page
assert "formLink(clubType,spec[0])" in page
assert "2026학년도 2학기 간담회 자료.pptx" in page
assert "https://hanjinjoo.github.io/osan-monitoring-2026/" in page
print("PASS: all 6 original HWP files, hashes, one-to-one download links, and existing site links")
