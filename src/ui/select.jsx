import React from 'react'

const Select = ({setdescription}) => {
  return (  <div>

    <h3>Тип квартиры</h3>
    <select class="form-select"  onChange={(e) => setdescription(e.target.value)} aria-label="Default select example">
    <option  value="Эконом">Эконом</option>
    <option selected value="Все">Все</option>
    <option value="Комфорт">Комфорт</option>
    <option value="Премиум">Премиум</option>
  </select>
  </div>
  )
}

export default Select