// A tagged template that escapes interpolated values unless they are
// already trusted markup. Arrays are joined, null/false/undefined render
// as nothing — enough to write readable templates without a framework.

class Markup {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);

// Marks a string as trusted HTML. Only used for hand-written content in src/.
export const raw = (value) => new Markup(value);

function render(value) {
  if (value == null || value === false) return '';
  if (Array.isArray(value)) return value.map(render).join('');
  if (value instanceof Markup) return value.value;
  return escape(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => {
    out += render(value) + strings[i + 1];
  });
  return new Markup(out);
}
