export const normalizeTags = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input
      .map((tag) => tag?.trim())
      .filter(Boolean)
      .map((tag) => tag.toLowerCase());
  }

  return input
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => tag.toLowerCase());
};

export const normalizeKeywords = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input
      .map((value) => value?.trim())
      .filter(Boolean)
      .map((value) => value.toLowerCase());
  }

  return input
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => value.toLowerCase());
};

export const normalizeSchemas = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.filter((entry) => entry && typeof entry === "object");
  }

  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return [];
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.filter((entry) => entry && typeof entry === "object");
    }
    if (parsed && typeof parsed === "object") {
      return [parsed];
    }
  }

  return [];
};
