import React, { useState, useRef, useEffect } from 'react';

// --- Componentes SVG para substituir os ícones do Feather ---
const CameraIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path> <circle cx="12" cy="13" r="4"></circle> </svg>
);
const UploadIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="17 8 12 3 7 8"></polyline> <line x1="12" y1="3" x2="12" y2="15"></line> </svg>
);
const CheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" > <polyline points="20 6 9 17 4 12"></polyline> </svg>
);
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg>
);
const CalendarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> <line x1="16" y1="2" x2="16" y2="6"></line> <line x1="8" y1="2" x2="8" y2="6"></line> <line x1="3" y1="10" x2="21" y2="10"></line> </svg>
);
// --- Fim dos Componentes SVG ---


export default function AdicionarPet() {
  const [sexo, setSexo] = useState('macho');
  const [castrado, setCastrado] = useState(false);
  const [especie, setEspecie] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  
  const [isEspecieDropdownOpen, setIsEspecieDropdownOpen] = useState(false);
  const [isDateHovered, setIsDateHovered] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [isTirarFotoHovered, setIsTirarFotoHovered] = useState(false);
  const [isGaleriaHovered, setIsGaleriaHovered] = useState(false);
  const [hoveredEspecie, setHoveredEspecie] = useState(null);
  const [isCancelarHovered, setIsCancelarHovered] = useState(false);
  const [isSalvarHovered, setIsSalvarHovered] = useState(false);
  
  const dropdownRef = useRef(null);
  const especies = ['Cão', 'Gato', 'Pássaro', 'Outro'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsEspecieDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleEspecieSelect = (esp) => {
    setEspecie(esp);
    setIsEspecieDropdownOpen(false);
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <p style={styles.headerTitle}>Novo Pet</p>
        <button style={styles.iconButton}>
          <XIcon size={24} color="#333" />
        </button>
      </div>

      <div style={styles.scrollContainer}>
        {/* Seção da Foto */}
        <div style={styles.card}>
          <p style={styles.cardTitleCenter}>Foto do Pet</p>
          <div style={styles.photoContainer}>
            <button style={styles.photoCircle}>
              <CameraIcon size={32} color="#888" />
            </button>
            <div style={styles.photoButtons}>
                <button style={{...styles.photoButton, ...(isTirarFotoHovered && styles.photoButtonHovered)}} onMouseEnter={() => setIsTirarFotoHovered(true)} onMouseLeave={() => setIsTirarFotoHovered(false)}>
                    <CameraIcon size={20} color={isTirarFotoHovered ? "#FFF" : "#555"} />
                    <span style={{...styles.photoButtonText, color: isTirarFotoHovered ? "#FFF" : "#555"}}>Tirar Foto</span>
                </button>
                <button style={{...styles.photoButton, ...(isGaleriaHovered && styles.photoButtonHovered)}} onMouseEnter={() => setIsGaleriaHovered(true)} onMouseLeave={() => setIsGaleriaHovered(false)}>
                    <UploadIcon size={20} color={isGaleriaHovered ? "#FFF" : "#555"} />
                    <span style={{...styles.photoButtonText, color: isGaleriaHovered ? "#FFF" : "#555"}}>Galeria</span>
                </button>
            </div>
          </div>
        </div>

        {/* Seção de Informações Básicas */}
        <div style={styles.card}>
            <p style={styles.cardTitle}>Informações Básicas</p>
            <label style={styles.label}>Nome do Pet *</label>
            <input style={styles.input} placeholder="Ex: Buddy" />

            <div style={styles.dropdownContainer} ref={dropdownRef}>
                <label style={styles.label}>Espécie *</label>
                <div style={{...styles.input, ...((isEspecieDropdownOpen || focusedField === 'especie') && styles.inputFocused)}} onClick={() => {setIsEspecieDropdownOpen(!isEspecieDropdownOpen); setFocusedField('especie')}} onBlur={() => setFocusedField(null)}>
                    <span style={{...styles.inputText, color: (isEspecieDropdownOpen || focusedField === 'especie') ? '#FFF' : (especie ? '#333' : '#aaa')}}>
                        {especie || 'Selecione'}
                    </span>
                </div>
                {isEspecieDropdownOpen && (
                    <div style={styles.dropdown}>
                        {especies.map((esp) => (
                            <div key={esp} style={{...styles.dropdownItem, ...(hoveredEspecie === esp && styles.dropdownItemHovered)}}
                                onClick={() => handleEspecieSelect(esp)} onMouseEnter={() => setHoveredEspecie(esp)} onMouseLeave={() => setHoveredEspecie(null)}>
                                {esp}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <label style={styles.label}>Raça</label>
            <input style={styles.input} placeholder="Ex: Golden Retriever" />

            <label style={styles.label}>Sexo *</label>
            <div style={styles.radioGroup}>
                <div style={styles.radioOption} onClick={() => setSexo('macho')}>
                    <div style={{...styles.radioOuter, ...(sexo === 'macho' && styles.radioOuterSelected)}}>
                        {sexo === 'macho' && <div style={styles.radioInner} />}
                    </div>
                    <span style={styles.radioLabel}>Macho</span>
                </div>
                <div style={styles.radioOption} onClick={() => setSexo('femea')}>
                    <div style={{...styles.radioOuter, ...(sexo === 'femea' && styles.radioOuterSelected)}}>
                        {sexo === 'femea' && <div style={styles.radioInner} />}
                    </div>
                    <span style={styles.radioLabel}>Fêmea</span>
                </div>
            </div>

            <label style={styles.label}>Data de Nascimento *</label>
            <label style={{position: 'relative', display: 'block', cursor: 'pointer'}} onMouseEnter={() => setIsDateHovered(true)} onMouseLeave={() => setIsDateHovered(false)} >
                <div style={{...styles.input, ...((isDateHovered || focusedField === 'date') && styles.inputFocused), display: 'flex', alignItems: 'center'}}>
                    <CalendarIcon size={16} color={(isDateHovered || focusedField === 'date') ? '#FFF' : '#aaa'} />
                    <span style={{...styles.dateText, color: (isDateHovered || focusedField === 'date') ? '#FFF' : (dataNascimento ? '#333' : '#aaa')}}>
                        {dataNascimento ? new Date(dataNascimento.replace(/-/g, '/')).toLocaleDateString('pt-BR') : 'Selecione a data'}
                    </span>
                </div>
                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} onFocus={() => setFocusedField('date')} onBlur={() => setFocusedField(null)} style={styles.dateInput} />
            </label>

            <label style={styles.label}>Cor</label>
            <input style={styles.input} placeholder="Ex: Dourado" />

            <div style={styles.checkboxContainer} onClick={() => setCastrado(!castrado)}>
                <div style={{...styles.checkbox, ...(castrado && styles.checkboxSelected)}}>
                    {castrado && <CheckIcon size={14} color="#FFF" />}
                </div>
                <span style={styles.checkboxLabel}>Castrado</span>
            </div>
        </div>

        {/* Outras Seções */}
        <div style={styles.card}>
            <p style={styles.cardTitle}>Medidas e Peso</p>
            <label style={styles.label}>Peso atual (kg)</label>
            <input style={styles.input} placeholder="Ex: 25.5" type="number" />
            <label style={styles.label}>Altura (cm)</label>
            <input style={styles.input} placeholder="Ex: 60" type="number"/>
        </div>

        <div style={styles.card}>
            <p style={styles.cardTitle}>Informações do Tutor</p>
            <label style={styles.label}>Nome do Tutor *</label>
            <input style={styles.input} placeholder="João Silva" />
            <label style={styles.label}>Telefone *</label>
            <input style={styles.input} placeholder="(11) 99999-9999" type="tel" />
            <label style={styles.label}>Email *</label>
            <input style={styles.input} placeholder="joao@email.com" type="email" />
            <label style={styles.label}>Contato de Emergência</label>
            <input style={styles.input} placeholder="Maria Silva" />
            <label style={styles.label}>Telefone de Emergência</label>
            <input style={styles.input} placeholder="(11) 88888-8888" type="tel" />
        </div>

        <div style={styles.card}>
            <p style={styles.cardTitle}>Observações</p>
            <textarea style={{...styles.input, ...styles.textArea}} placeholder="Adicione informações importantes..." rows={4} />
        </div>

        {/* Botões de Ação */}
        <div style={styles.actionButtons}>
            <button style={{...styles.cancelButton, ...(isCancelarHovered && styles.cancelButtonHovered)}} onMouseEnter={() => setIsCancelarHovered(true)} onMouseLeave={() => setIsCancelarHovered(false)}>
                <span style={{...styles.cancelButtonText, color: isCancelarHovered ? '#FFF' : '#888'}}>Cancelar</span>
            </button>
            <button style={{...styles.saveButton, ...(isSalvarHovered && styles.saveButtonHovered)}} onMouseEnter={() => setIsSalvarHovered(true)} onMouseLeave={() => setIsSalvarHovered(false)}>
                <span style={styles.saveButtonText}>Salvar Pet</span>
            </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
    container: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F7F8FA', fontFamily: 'sans-serif' },
    header: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #EEE', backgroundColor: '#FFF', position: 'relative' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    iconButton: { background: 'none', borderWidth: 0, cursor: 'pointer', position: 'absolute', right: '20px' },
    scrollContainer: { padding: 20, overflowY: 'auto', flex: 1 },
    card: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: '1px', borderStyle: 'solid', borderColor: '#E8E8E8' },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#444', marginBottom: 20 },
    cardTitleCenter: { fontSize: 16, fontWeight: 'bold', color: '#444', marginBottom: 20, textAlign: 'center' },
    photoContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    photoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F0F0F0', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 0, cursor: 'pointer' },
    photoButtons: { display: 'flex', justifyContent: 'center', gap: '20px' },
    photoButton: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', padding: '8px 15px', borderRadius: 8, borderWidth: 0, cursor: 'pointer', transition: 'background-color 0.3s ease' },
    photoButtonHovered: { backgroundColor: '#C8754D' },
    photoButtonText: { marginLeft: 8, color: '#555', fontWeight: '500', transition: 'color 0.3s ease' },
    label: { fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10, display: 'block' },
    input: { backgroundColor: '#F7F8FA', borderRadius: 8, padding: '12px 15px', fontSize: 16, color: '#333', borderWidth: '1px', borderStyle: 'solid', borderColor: '#E8E8E8', width: '100%', boxSizing: 'border-box', transition: 'background-color 0.3s ease, border-color 0.3s ease' },
    inputFocused: { backgroundColor: '#C8754D', borderColor: '#C8754D' },
    inputText: { fontSize: 16, transition: 'color 0.3s ease' },
    dateText: { fontSize: 16, marginLeft: 8, transition: 'color 0.3s ease' },
    dateInput: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' },
    textArea: { height: 100, resize: 'vertical', paddingTop: '12px' },
    radioGroup: { display: 'flex', alignItems: 'center', margin: '10px 0' },
    radioOption: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 25, cursor: 'pointer' },
    radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: '2px', borderStyle: 'solid', borderColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
    radioOuterSelected: { borderColor: '#84B486' },
    radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#84B486' },
    radioLabel: { marginLeft: 8, fontSize: 16, color: '#333' },
    checkboxContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, cursor: 'pointer' },
    checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: '2px', borderStyle: 'solid', borderColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
    checkboxSelected: { backgroundColor: '#84B486', borderColor: '#84B486' },
    checkboxLabel: { marginLeft: 10, fontSize: 16, color: '#333' },
    actionButtons: { display: 'flex', justifyContent: 'space-between', gap: '20px' },
    cancelButton: { flex: 1, padding: 15, borderRadius: 8, borderWidth: '1px', borderStyle: 'solid', borderColor: '#DDD', backgroundColor: '#FFF', cursor: 'pointer', transition: 'background-color 0.3s ease, border-color 0.3s ease' },
    cancelButtonHovered: { backgroundColor: '#C8754D', borderColor: '#C8754D' },
    cancelButtonText: { color: '#888', fontWeight: 'bold', fontSize: 16, transition: 'color 0.3s ease' },
    saveButton: { flex: 1, backgroundColor: '#84B486', padding: 15, borderRadius: 8, borderWidth: 0, cursor: 'pointer', transition: 'background-color 0.3s ease' },
    saveButtonHovered: { backgroundColor: '#629265' },
    saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    dropdownContainer: { position: 'relative', marginBottom: 15 },
    dropdown: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#FFF', borderRadius: 8, borderWidth: '1px', borderStyle: 'solid', borderColor: '#E8E8E8', marginTop: 4, zIndex: 1000, padding: '4px', overflow: 'hidden' },
    dropdownItem: { padding: '12px 15px', cursor: 'pointer', transition: 'all 0.3s ease' },
    dropdownItemHovered: { backgroundColor: '#C8754D', color: '#FFF', borderRadius: '6px' },
};

