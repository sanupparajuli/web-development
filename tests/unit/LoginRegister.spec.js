import { mount } from '@vue/test-utils'

import LoginRegister from '@/components/LoginRegister/LoginRegister.vue';
import { emit } from 'node-notifier';


describe('LoginRegiser Component', ()=>{
    it('check if truthy', ()=>{
      const wrapper =  mount(LoginRegister);
      expect(wrapper).toBeTruthy()
    })

    it('Check the route path', ()=>{
        const $route = { path:'http://localhost:8080/LoginRegister' };
        const wrapper = mount(LoginRegister, {
            mocks:{
                $route
            }
        })

        expect(wrapper.vm.$route.path).toBe($route.path)
    })

    it('check login function', async()=>{
        const wrapper = mount(LoginRegister);

        const Login_input = wrapper.find('.loginbut');

        // enter email and password into inputs
        const Email_input = wrapper.find('.emailIN');
        const Pass_input = wrapper.find('.PassIN');

        // set email and pass data
        let email = 'A@A.com';
        let pass = '88888888';

        await Email_input.setValue(email);
        await Pass_input.setValue(pass);

        jest.spyOn(wrapper.vm, 'Login');

        // fire on .. press enter
        Login_input.trigger('click')


        // check that Login fun has been called
        expect( wrapper.vm.Login ).toHaveBeenCalled();
        // check the enterd data on data method
        expect( wrapper.vm.$data.LoginData.Email ).toBe(email)
        expect( wrapper.vm.$data.LoginData.Password ).toBe(pass)
    })

    it('check register fun', async ()=>{
        const wrapper = mount(LoginRegister);

        const Register_input = wrapper.find('.RegisterIN');

        // enter mail and password into inputs
        const Email_input = wrapper.find('.R_Email')
        const Pass_input = wrapper.find('.R_Pass')
        const CPass_input = wrapper.find('.CR_Pass')

        // set email adn pass data
        let email = 'A@A.com';
        let pass = '88888888';
        let Cpass = '88888888';

        await Email_input.setValue(email)
        await Pass_input.setValue(pass)
        await CPass_input.setValue(Cpass)

        jest.spyOn(wrapper.vm, 'Register');

        // fire on regiser input
        Register_input.trigger('click');


        // check if that register has been called
        expect(wrapper.vm.Register).toHaveBeenCalled();

        // check the endter data ond data method
        console.log('unit test eamil data ',wrapper.vm.$data.RegisterData.Email )
        expect(wrapper.vm.$data.RegisterData.Email).toBe(email)
        expect(wrapper.vm.$data.RegisterData.Pass).toBe(pass)
        expect(wrapper.vm.$data.RegisterData.confirmPass).toBe(Cpass)
        
    })

})




