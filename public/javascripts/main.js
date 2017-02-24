$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/companies/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});

$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/companies/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});

$('#sort').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/companies/'+val,
      type:'GET'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});

  
if (window.location.pathname === '/companies') {

  fetch('/api/v1/Company?sort=createdate').then(function(res) {
    res.json().then(function(companies) {
      console.log('companies', companies);
      var tbody = document.getElementById('table-body');
      companies.forEach(function(company) {
        
        /tbody.insertAdjacentHTML('beforeend', '<td> <a href="/companies/' + company._id + '">' + company.company_name + '</a></td> <td> ' + company.stock_symbol + '</td> <td>' + company.sector + ' </td> <td>' + company.subector + ' </td> <td>' + company.listing_name + ' </td>');
        //tbody.insertAdjacentHTML('beforeend', '<li><a href="/companies/'+ company._id + '">'+company.company_name+'</a></li>');
        

      });
    })
  });

  fetch('api/v1/company/count').then(function(res) {
    res.json().then(function(companies) { 
      console.log('companies', companies);
      var count = document.getElementById('count');
        count.insertAdjacentHTML('beforeend', '<h1>Total companies: '+companies.count+'</h1>');
    
    })
  });
  const request = require('request')

  request.get({
    url: '/api/v1/company',
    qs: {
      query: JSON.stringify({[{
          company_name: 'Company'
        }],
      })
    }
  })
}