import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../core/customHook";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import classnames from 'classnames';
import './style.scss';
import AuthAction from "../../../redux/actions/AuthAction";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import { useEffect } from "react";

const ChangePasswordScreen = () => {
    useTitle("Đổi mật khẩu");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateChangePasswordSchema = yup.object().shape({
        current_password: yup.string().required('Không thể bỏ trống'),
        new_password: yup.string().required('Không thể bỏ trống'),
    })

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({resolver: yupResolver(validateChangePasswordSchema)});

    const onSubmitChangePassword = async (data) => {
        const { current_password, new_password } = data;
        const response = await dispatch(await AccountUserAction.asyncChangePassword(data));
        if(response.status === 200) {
            navigate('/login');
        }
        reset();
    }


    return (
        <div className="user-page login-user-page">
            <div className='login-content'>
                <div className='login-title mg-tb-20'>
                    <h1>Đổi mật khẩu</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmitChangePassword)} className='login-form'>
                    <div>
                        <label className={classnames("d-block mg-tb-10")} htmlFor="username">Mật khẩu hiện tại</label>
                        <input {...register('current_password')} type="text" className={classnames("width-250", `${errors.current_password ? "border border-danger" : ""}`)} id="current_password" placeholder="Current Password"/>
                        <p className="text-danger">{errors.current_password?.message}</p>
                    </div>
                    <div>
                        <label className={classnames("d-block mg-tb-10")} htmlFor="password">Mật khẩu mới</label>
                        <input {...register('new_password')} type="text" className={classnames("width-250", `${errors.new_password ? "border border-danger" : ""}`)} id="new_password" placeholder="New Password"/>
                        <p className="text-danger">{errors.new_password?.message}</p>
                    </div>
                    
                    <div className="mg-t-20" style={{"textAlign": "center"}}>
                        <button className={classnames("width-300 btn-custom")} disabled={isSubmitting} type="submit">Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePasswordScreen