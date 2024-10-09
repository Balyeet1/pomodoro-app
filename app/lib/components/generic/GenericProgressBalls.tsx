export default function ProgressBalls({
    amount,
    amountFilled,
    ballStyleEmpty,
    ballStyleFilled,
}: {
    amount: number,
    amountFilled: number,
    ballStyleEmpty?: string,
    ballStyleFilled?: string,
}) {

    if (amountFilled > amount) {
        throw new Error("amountFilled cannot be greater than amount");
    }

    if (amountFilled < 0) {
        throw new Error("amountFilled cannot be less than 0");
    }

    if (amount < 1) {
        throw new Error("amount cannot be less than 1");
    }


    return (
        <div className='w-full flex justify-center gap-4'>
            {[...Array(amountFilled)].map((_, index) => (
                <div
                    key={index}
                    className={`min-h-[24px] min-w-[24px] rounded-full border-2 bg-gray-200 ${ballStyleFilled}`}>
                </div>
            ))
            }
            {[...Array(amount - amountFilled)].map((_, index) => (
                <div
                    key={index}
                    className={`min-h-[24px] min-w-[24px] rounded-full border-2 ${ballStyleEmpty}`}>
                </div>
            ))
            }
        </div >
    );
}