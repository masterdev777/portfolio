

jQuery(document).ready(function($) {
  "use strict";
  emailjs.init('5NpiwcY84jr3V0wmR');
  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    var name = "";
    var email = "";
    var subject = "";
    var message = "";
    f.children('input').each(function(index) { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');
      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }
        
        if(index === 0)name = i.val();
        if(index === 1)email = i.val();
        if(index === 2)subject = i.val();

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');
      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }
        message = i.val();
        
        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    const templateParams = {
      from_name: name,
      email:email,
      subject:subject,
      message: message
    };
     
    
    emailjs.send('service_ud6o1lf', 'template_u24y45z',templateParams)
      .then(function(response) {
        if(response.status === 200 && response.text === "OK"){
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        }
        else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(response.text);
        }
      }, function(error){
        alert('Email sending failed. Please try again.');
      }
    );
    // console.log(str);
    // emailjs.send('service_ud6o1lf', 'template_u24y45z',templateParams)
    //   .then(function(response) {
    //     if(response.status === 200 && response.text === "OK"){
    //       $("#sendmessage").addClass("show");
    //       $("#errormessage").removeClass("show");
    //       $('.contactForm').find("input, textarea").val("");
    //     }
    //     else {
    //       $("#sendmessage").removeClass("show");
    //       $("#errormessage").addClass("show");
    //       $('#errormessage').html(response.text);
    //     }
    //   }, function(error){
    //     console.log('Email sending failed:', error);
    //     alert('Email sending failed. Please try again.');
    //   }
    // );
    return false;
  });
});
