const V_CONSOLE = 'V_CONSOLE'

export function openVConsole () {
  localStorage.setItem(V_CONSOLE, '1')
}

export function closeVConsole () {
  localStorage.setItem(V_CONSOLE, '0')
}

export function getVConsole () {
  return localStorage.getItem(V_CONSOLE)
}

export function resetVConsole () {
  localStorage.setItem(V_CONSOLE, '0')
}
