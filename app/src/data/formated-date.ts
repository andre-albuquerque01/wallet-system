export function FormatDate(dataISO: string): string {
    function padLeft(value: number): string {
      return value < 10 ? '0' + value : value.toString()
    }
  
    if (dataISO) {
      const data = new Date(dataISO)
  
      const dia = padLeft(data.getDate())
      const mes = padLeft(data.getMonth() + 1)
      const ano = data.getFullYear()
      const hora = padLeft(data.getHours())
      const minuto = padLeft(data.getMinutes())
  
      return `${hora}:${minuto} - ${dia}/${mes}/${ano}`
    }
    return ''
  }