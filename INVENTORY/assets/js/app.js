document.addEventListener('DOMContentLoaded', ()=>{
  // sidebar toggle for mobile
  const sidebar = document.querySelector('.sidebar');
  document.querySelectorAll('[data-toggle="sidebar"]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ e.preventDefault(); sidebar.classList.toggle('show'); });
  });

  // initialize charts if canvas present
  if(window.Chart){
    const salesCtx = document.getElementById('chartSales');
    if(salesCtx){
      new Chart(salesCtx, {type:'line', data:{labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], datasets:[{label:'Sales', data:SAMPLE.salesByMonth, borderColor:'#0d6efd', backgroundColor:'rgba(13,110,253,0.08)', tension:0.3}]} , options:{responsive:true}});
    }
    const invCtx = document.getElementById('chartInventory');
    if(invCtx){
      new Chart(invCtx, {type:'doughnut', data:{labels:['Electronics','Stationery','Accessories','Food','Tools','Other'], datasets:[{data:SAMPLE.inventoryByCategory, backgroundColor:['#0d6efd','#6c757d','#198754','#ffc107','#dc3545','#0dcaf0']}]} , options:{responsive:true}});
    }
  }

});
