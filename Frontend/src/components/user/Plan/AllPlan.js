import styled from "styled-components";
import { FaRupeeSign, FaEye, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Link } from 'react-router-dom'
import { Get_All_Plans, Get_All_Buyed_Plans, BuyPlan, AddBalance } from "../../CommonAPI/User";
import Swal from "sweetalert2";

import { useEffect } from "react";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 300px; /* Reduced width for better horizontal scrolling */
  padding: 15px;y
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(to right, #3f414d 0%, #3f414d 100%) !important;
    color: #fff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:hover h2,
  &:hover h4,
  &:hover p {
    color: #fff;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 600px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: grid;
  gap: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #e74c3c;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  color: #fff;
  background-color: ${(props) => (props.primary ? "#007BFF" : "#28a745")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.primary ? "#0056b3" : "#218838")};
  }

  svg {
    margin-right: 5px;
  }
`;
const ServicesList = () => {
    const username = localStorage.getItem("name")
    const [GetAllPlans, setAllPlans] = useState({ loading: true, data: [] });
    const [BuyedPlan, setBuyedPlan] = useState({ loading: true, data: [] });


    useEffect(() => {
        GetAllPlansData();
        AllBuyedPlans();
    }, []);


    const GetAllPlansData = async () => {
        await Get_All_Plans()
            .then((response) => {
                if (response.Status) {
                    setAllPlans({
                        loading: false,
                        data: response.Admin,
                    });
                }
            });
    };

    const AllBuyedPlans = async () => {
        const req = { userName: username }
        await Get_All_Buyed_Plans(req)
            .then((response) => {
                if (response.Status) {
                    setBuyedPlan({
                        loading: false,
                        data: response.Allotplan,
                    })
                }
                else {
                    setBuyedPlan({
                        loading: false,
                        data: [],
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            }
            )


    }



    const imgArr = [
        "https://cdn.pixabay.com/photo/2024/05/31/05/24/trading-8799817_640.png",
        "https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_640.jpg",
        "https://cdn.pixabay.com/photo/2020/04/16/15/40/stock-5051155_640.jpg",
        "https://cdn.pixabay.com/photo/2023/07/28/08/06/finance-8154775_640.jpg",
    ];


    const SetPlan = (name) => {
        console.log(name)
        if (BuyedPlan?.data.length === 0) {
            return null;
        }

        const plan = BuyedPlan?.data.find((plan) => plan.Planname === name);
        if (plan) {
            console.log(plan)
            return <BadgeCheck size={24} color="green" />;
        }
        return null;

    };


    function getRandomNumber() {
        return Math.floor(Math.random() * 3) + 1;
    }

    const HandleBuyPlan = async (index) => {
        try {
            // Get plan details
            const planDetails = GetAllPlans?.data[index];
            const req = {
                Username: username,
                Scalping: planDetails.Scalping,
                Option: planDetails['Option Strategy'],
                PatternS: planDetails.Pattern,
                NumberofScript: planDetails.NumberofScript,
                Duration: ['One Month', 'Quarterly', 'Half Yearly', 'Yearly'][planDetails['Plan Validity'] - 1],
                Planname: planDetails.PlanName,
                payment: planDetails.payment
            };
            const req1 = { Username: username, transactiontype: 'Purchase', money: planDetails.payment };

            // Show confirmation alert
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to buy the plan: ${planDetails.PlanName} for ₹${planDetails.payment}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Buy it!',
                cancelButtonText: 'No, Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                // Check balance and proceed with the purchase
                const CheckBalanceResponse = await AddBalance(req1);
                if (CheckBalanceResponse.Status) {
                    const buyPlanResponse = await BuyPlan(req);
                    if (buyPlanResponse.Status) {
                        AllBuyedPlans();
                        Swal.fire({
                            title: "Success!",
                            text: buyPlanResponse.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: buyPlanResponse.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                    }
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: CheckBalanceResponse.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true,
                    });
                }
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your purchase has been cancelled.',
                    icon: 'info',
                    timer: 1500,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error('Error in transaction:', error);
            Swal.fire({
                title: "Error",
                text: "An unexpected error occurred",
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
            });
        }
    };






    return (
        <>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='iq-card'>
                        <div className='iq-card-header d-flex justify-content-between'>
                            <div className='iq-header-title'>
                                <h4 className='card-title'>All Plans</h4>
                            </div>
                        </div>
                        <div className='iq-card-body'>
                            <div style={styles.container} className="row">
                                {GetAllPlans?.data.map((plan, index) => (
                                    <Card key={index} style={styles.card} className="col-lg-3 col-md-6 mb-3">
                                        <img src={imgArr[getRandomNumber()]} alt={plan.PlanName} style={styles.image} />
                                        <div style={styles.content}>
                                            <h2 style={styles.title}>
                                                {plan.PlanName} {SetPlan(plan.PlanName)}
                                            </h2>
                                            <h4 style={styles.subtitle}><FaRupeeSign className="m-1" /><strong>{plan.payment}</strong></h4>
                                            <h4 style={styles.subtitle}>No of Scripts: {plan.NumberofScript}</h4>
                                            <div style={styles.prices}>
                                                <p style={styles.priceItem}>
                                                    <strong>Scalping Strategy:</strong> {plan.Scalping.join(", ")}
                                                </p>
                                                <p style={styles.priceItem}>
                                                    <strong>Option Strategy:</strong> {plan['Option Strategy'].join(", ")}
                                                </p>
                                                <p style={styles.priceItem}>
                                                    <strong>Pattern Strategy:</strong> {plan?.Pattern?.join(", ")}
                                                </p>
                                            </div>
                                            {SetPlan(plan.PlanName) == null ? (
                                                <div style={styles.buttonContainer}>
                                                    <Button primary style={styles.button} onClick={() => HandleBuyPlan(index)}>
                                                        BUY NOW
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div style={styles.buttonContainer}>
                                                    <Button style={styles.subscribedButton}>
                                                        Subscribed
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const modalStyles = {
    image: {
        width: "100%",
        height: "auto",
        maxWidth: "250px", // Fixed width same as card
        maxHeight: "150px", // Fixed height same as card
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "15px",
    },
    prices: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        color: "#555",
        padding: "0",
        listStyle: "none",
    },
};

const styles = {
    container: {
        // display: "flex",
        // flexWrap: "nowrap",
        overflowX: "auto",
        padding: "5px",
        gap: "20px",
    },
    image: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "15px",
    },
    title: {
        fontSize: "1.5rem",
        margin: "10px 0",
        color: "#333",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: "1.2rem",
        margin: "5px 0",
    },
    description: {
        fontSize: "1rem",
        margin: "10px 0",
    },
    prices: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "10px 0",
        color: "#555",
        padding: "0",
        listStyle: "none",
    },
    priceItem: {
        margin: "5px 0",
        textAlign: "left",
    },
    buttonContainer: {
        marginTop: "15px",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
};

export default ServicesList;
