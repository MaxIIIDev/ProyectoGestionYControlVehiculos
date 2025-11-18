export default function ComboBoxFiller(
  action: string,
  method: string,
  body: any
) {
  return fetch(action, {
    method: method,
    headers: { "Contett-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
