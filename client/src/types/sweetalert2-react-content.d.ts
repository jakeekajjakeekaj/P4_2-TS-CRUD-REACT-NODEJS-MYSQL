declare module 'sweetalert2-react-content' {
  import { SweetAlertOptions } from 'sweetalert2';
  import Swal from 'sweetalert2';
  
  interface ReactSweetAlert {
    fire: (options: SweetAlertOptions) => Promise<any>;
  }

  function withReactContent(swal: typeof Swal): ReactSweetAlert;

  export default withReactContent;
};