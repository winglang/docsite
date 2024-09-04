import React, { useEffect } from 'react'

export default function Example() {

  useEffect(() => {

    setTimeout(() => {
      // @ts-ignore
      if (window.hbspt) {
        // @ts-ignore
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "26754295",
          formId: "facdc039-1535-48fe-ba43-c1a25b92af0c",
          target: '#hubspotForm',
          onFormReady: function ($form) {
            // $('input[name="url"]').val(window.location.href).change();
          }
        });
      }
    }, 200);


  }, []);

  return (
    <div id="hubspotForm-contact">
      <h2 className='block md:hidden text-xl text-white'>Contact us</h2>
     <div id="hubspotForm"></div>
    </div>
  )
}
