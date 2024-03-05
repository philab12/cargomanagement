import { store } from "../../app/store";
import { idTypeApiSlice } from "../idType/idTypeApiSlice";
import { courierTypeApiSlice } from "../courierType/courierTypeApiSlice";
import { courierCategoryApiSlice } from "../courierCate/courierCategoryApiSlice";
import { courierStageApiSlice } from "../courierStage/courierStageApiSlice"; 
import { branchApiSlice } from "../branch/branchApiSlice"; 
import { tripApiSlice } from "../tripSetup/tripApiSlice";  
import { courierPriceApiSlice } from "../courierPrice/courierPriceApiSlice";  
import { weightUnitApiSlice } from "../weightUnit/weightUnitApiSlice";  
import { extraChargeApiSlice } from "../extraCharge/extraChargeApiSlice";  
import { securityQuestionApiSlice } from "../securityQuestion/securityQuestionApiSlice";  
import { transactionApiSlice } from "../transaction/transactionApiSlice";  
import { customerApiSlice } from "../customer/customerApiSlice";  
import { userApiSlice } from "../user/userApiSlice";  
import { consolidatedPackageApiSlice } from "../consolidatedPackage/consolidatedPackageApiSlice";  
import { Outlet } from "react-router-dom";

import React, { useEffect } from 'react'

const Prefetch = () => {
  useEffect(() => {
  //  console.log('subscribing')
    const idTypes = store.dispatch(idTypeApiSlice.endpoints.getIdTypes.initiate())
    const courierTypes = store.dispatch(courierTypeApiSlice.endpoints.getCourierTypes.initiate())
    const courierCates = store.dispatch(courierCategoryApiSlice.endpoints.getCourierCategorys.initiate())
    const courierStages = store.dispatch(courierStageApiSlice.endpoints.getCourierStages.initiate())
    const branches = store.dispatch(branchApiSlice.endpoints.getBranchs.initiate())
    const trips = store.dispatch(tripApiSlice.endpoints.getTrips.initiate())
    const courierPrices = store.dispatch(courierPriceApiSlice.endpoints.getCourierPrices.initiate())
    const weightUnits = store.dispatch(weightUnitApiSlice.endpoints.getWeightUnits.initiate())
    const extraCharges = store.dispatch(extraChargeApiSlice.endpoints.getExtraCharges.initiate())
    const securityQuestions = store.dispatch(securityQuestionApiSlice.endpoints.getSecurityQuestions.initiate())
    const transactions = store.dispatch(transactionApiSlice.endpoints.getTransactions.initiate())
    const customers = store.dispatch(customerApiSlice.endpoints.getCustomers.initiate())
    const users = store.dispatch(userApiSlice.endpoints.getUsers.initiate())
    const consolidatedPackages = store.dispatch(consolidatedPackageApiSlice.endpoints.getConsolidatedPackages.initiate())

    return () => {
        console.log("unsubscribing")
        idTypes.unsubscribe()
        courierTypes.unsubscribe()
        courierCates.unsubscribe()
        courierStages.unsubscribe()
        branches.unsubscribe()
        trips.unsubscribe()
        courierPrices.unsubscribe()
        weightUnits.unsubscribe()
        extraCharges.unsubscribe()
        securityQuestions.unsubscribe()
        transactions.unsubscribe()
        customers.unsubscribe()
        users.unsubscribe()
        consolidatedPackages.unsubscribe()
    }
  },[])

  return <Outlet />
}

export default Prefetch
