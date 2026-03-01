import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------- USER ROLE ----------
const USER_ROLE_KEY = '@user_role';

export async function setUserRole(role) {
  await AsyncStorage.setItem(USER_ROLE_KEY, role);
}

export async function getUserRole() {
  return await AsyncStorage.getItem(USER_ROLE_KEY);
}

export async function clearUserRole() {
  await AsyncStorage.removeItem(USER_ROLE_KEY);
}

// ---------- INFORMATIVOS ----------
const INFORMATIVOS_KEY = '@informativos';

export async function getInformativos() {
  const data = await AsyncStorage.getItem(INFORMATIVOS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveInformativo(informativo) {
  const informativos = await getInformativos();
  informativos.unshift(informativo);
  await AsyncStorage.setItem(INFORMATIVOS_KEY, JSON.stringify(informativos));
}

// ---------- INFORMATIVOS (EXTRA) ----------

export async function deleteInformativo(index) {
  const informativos = await getInformativos();
  informativos.splice(index, 1);
  await AsyncStorage.setItem('@informativos', JSON.stringify(informativos));
}

export async function updateInformativo(index, novoInformativo) {
  const informativos = await getInformativos();
  informativos[index] = novoInformativo;
  await AsyncStorage.setItem('@informativos', JSON.stringify(informativos));
}



// ---------- OCORRÊNCIAS ----------
const OCORRENCIAS_KEY = '@ocorrencias';

export async function getOcorrencias() {
  const data = await AsyncStorage.getItem(OCORRENCIAS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveOcorrencia(ocorrencia) {
  const ocorrencias = await getOcorrencias();
  ocorrencias.unshift(ocorrencia);
  await AsyncStorage.setItem(OCORRENCIAS_KEY, JSON.stringify(ocorrencias));
}

// ---------- OCORRÊNCIAS (EXTRA) ----------

export async function deleteOcorrencia(index) {
  const ocorrencias = await getOcorrencias();
  ocorrencias.splice(index, 1);
  await AsyncStorage.setItem('@ocorrencias', JSON.stringify(ocorrencias));
}

export async function updateOcorrencia(index, novaOcorrencia) {
  const ocorrencias = await getOcorrencias();
  ocorrencias[index] = novaOcorrencia;
  await AsyncStorage.setItem('@ocorrencias', JSON.stringify(ocorrencias));
}
