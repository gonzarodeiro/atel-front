const chooseAnOption = { id: 0, code: '', description: 'Seleccione' };
const dlDifficulty = [chooseAnOption, { id: 1, code: 'TPA', description: 'TPA - Discapacidad de la memoria por el trastorno del proceso auditivo' }, { id: 2, code: 'TDA', description: 'TDA - Transtorno por deficit de atención' }, { id: 3, code: 'TDHA', description: 'TDHA - Transtorno por deficit de atención e hiperactividad' }, { id: 4, code: 'TEA', description: 'TEA - Transtorno del espectro autista' }, { id: 5, code: 'TGD', description: 'TGD - Transtorno generalizado del desarrollo' }, { id: 6, code: 'TANV', description: 'TANV - Transtorno de aprendizaje no verbal' }, { id: 7, code: 'TEL', description: 'TEL - Transtorno específico del lenguaje' }, { id: 8, code: 'Dislexia', description: 'Dislexia' }, { id: 9, code: 'Disgrafia', description: 'Disgrafia' }, { id: 10, code: 'Discapacidad intelectual', description: 'Discapacidad intelectual' }, { id: 11, code: 'Retraso madurativo', description: 'Retraso madurativo' }, { id: 12, code: 'Otra', description: 'Otra' }];
const dlStudents = [chooseAnOption, { id: 1, code: 'LucasGomez', description: 'Lucas Gomez' }, { id: 2, code: 'LeandroPerez', description: 'Leandro Perez' }];
const dlStatus = [chooseAnOption, { id: 1, code: 'Finalizada', description: 'Finalizada' }, { id: 2, code: 'Cancelada', description: 'Cancelada' }];
const dlProfession = [chooseAnOption, { id: 1, code: 'Asistente terapéutico', description: 'Asistente Terapéutico' }, { id: 2, code: 'Asistente social', description: 'Asistente Social' }, { id: 3, code: 'Fonoaudiólogo', description: 'Fonoaudiólogo' }, { id: 4, code: 'Psiquiatra', description: 'Psiquiatra' }, { id: 5, code: 'Pediatra', description: 'Pediatra' }, { id: 6, code: 'Psicólogo', description: 'Psicólogo' }, { id: 7, code: 'Psicopedagogo', description: 'Psicopedagogo' }, { id: 8, code: 'T.O', description: 'T.O' }, { id: 9, code: 'Otra', description: 'Otra' }];
const dlEvaluationSession = [chooseAnOption, { id: 1, code: 1, description: 'Muy buena' }, { id: 2, code: 2, description: 'Buena' }, { id: 3, code: 3, description: 'Regular' }, { id: 4, code: 4, description: 'Mala' }];
const dlSessionType = [chooseAnOption, { id: 1, code: 1, description: 'Sesión de inclusión' }, { id: 2, code: 2, description: 'Sesión personal' }];

export { dlDifficulty, dlSessionType, dlStudents, dlStatus, dlProfession, dlEvaluationSession };
