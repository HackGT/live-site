const STORAGE_KEY = "hexlabs.volunteerNameMatches";

type NameMatches = { [normalizedName: string]: string };

// Must match the backend's normalization in the volunteer-shift import route
export const normalizeName = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase();

export const loadNameMatches = (): NameMatches => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    return stored && typeof stored === "object" ? stored : {};
  } catch (e) {
    return {};
  }
};

export const lookupNameMatch = (name: string): string | undefined =>
  loadNameMatches()[normalizeName(name)];

export const updateNameMatches = (updates: { [name: string]: string | undefined }) => {
  const matches = loadNameMatches();
  Object.keys(updates).forEach(name => {
    const userId = updates[name];
    if (userId) matches[normalizeName(name)] = userId;
    else delete matches[normalizeName(name)];
  });
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
};
