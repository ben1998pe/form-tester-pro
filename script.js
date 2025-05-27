let fieldId = 0;

function addField() {
  const container = document.getElementById('fields-container');
  const id = `field-${fieldId++}`;

  const div = document.createElement('div');
  div.className = "bg-gray-700 p-3 rounded space-y-2";
  div.innerHTML = `
    <input type="text" placeholder="Etiqueta del campo" class="w-full p-2 rounded bg-gray-900 text-white" onchange="updateForm()" data-id="${id}" data-type="label" />
    <select class="w-full p-2 rounded bg-gray-900 text-white" onchange="updateForm()" data-id="${id}" data-type="type">
      <option value="text">Texto</option>
      <option value="email">Email</option>
      <option value="number">Número</option>
      <option value="textarea">Área de texto</option>
    </select>
    <label class="flex items-center gap-2 bg-gray-900 px-3 py-2 rounded border border-cyan-400 shadow-md">
        <input type="checkbox" class="accent-cyan-400 w-4 h-4" data-id="${id}" data-type="required" onchange="updateForm()" />
        <span class="text-cyan-300 text-sm uppercase tracking-wide">Requerido</span>
        </label>

  `;
  container.appendChild(div);

  updateForm();
}

function updateForm() {
  const container = document.getElementById('fields-container');
  const preview = document.getElementById('form-preview');
  const output = document.getElementById('html-output');
  preview.innerHTML = '';
  let htmlCode = '<form>\n';

  const fields = container.querySelectorAll('[data-id]');
  const fieldGroups = {};

  // Agrupar datos por fieldId
  fields.forEach(el => {
    const id = el.dataset.id;
    if (!fieldGroups[id]) fieldGroups[id] = {};
    fieldGroups[id][el.dataset.type] = el.type === 'checkbox' ? el.checked : el.value;
  });

  Object.values(fieldGroups).forEach(field => {
    const label = field.label || 'Campo';
    const type = field.type || 'text';
    const required = field.required ? ' required' : '';

    htmlCode += `  <label>${label}</label>\n`;

    if (type === 'textarea') {
      htmlCode += `  <textarea name="${label.toLowerCase()}"${required}></textarea>\n\n`;
      preview.innerHTML += `<label class="block">${label}<textarea class="w-full p-2 bg-gray-900 rounded"${required}></textarea></label>`;
    } else {
      htmlCode += `  <input type="${type}" name="${label.toLowerCase()}"${required} />\n\n`;
      preview.innerHTML += `<label class="block">${label}<input type="${type}" class="w-full p-2 bg-gray-900 rounded"${required}></label>`;
    }
  });

  htmlCode += '</form>';
  output.value = htmlCode;
}

function copyCode() {
  const code = document.getElementById('html-output');
  code.select();
  document.execCommand('copy');
  alert('¡Código copiado al portapapeles!');
}
