
import { Card } from "../components/card";
import SideBar from "../components/sideBar";
import "./board.css";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';

export const Board = (()=>{

    return <>
        <div className="boardPage">
            <SideBar/>
            <div className="boardPageContent">
                <div className="boardPageContentHeader1">
                    <div className="boardPageContentHeader1UserName">Welcome! Kumar</div>
                    <div className="boardPageContentHeader1Date">12th Jan, 2024</div>
                </div>
                <div className="boardPageContentHeader2">
                <div className="boardPageContentHeader2Title">Board</div>
                    <div className="boardPageContentHeader2DropDown">This Week</div>
                </div>
                
                <div className="boardPageContentMain">

        {/* Backlog */}

                    <div className="boardPageContentMainBacklog">
                        <div className="boardPageContentMainBacklogHeader">
                            <p id = "boardPageContentMainBacklogHeaderTitle">Backlog</p>
                            <ContentCopyIcon/>
                        </div>

                        <div className="boardPageContentMainBacklogCardList">
                            <div className="boardPageContentMainBacklogCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainBacklogCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainBacklogCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainBacklogCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainBacklogCard">
                            <Card/>
                            </div>

                        </div>
                    </div>

        {/* ToDo */}

                    <div className="boardPageContentMainTodo">
                        <div className="boardPageContentMainTodoHeader">
                            <p id = "boardPageContentMainTodoHeaderTitle">To do</p>
                            <div className="boardPageContentMainTodoHeaderRight">
                            {/* <p id = "boardPageContentMainTodoHeaderAddButton"></p> */}
                            <AddIcon/>
                            <ContentCopyIcon/>
                            </div>
                        </div>

                        <div className="boardPageContentMainTodoCardList">
                            <div className="boardPageContentMainTodoCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainTodoCard">
                            <Card/>
                            </div>

                            {/* <div className="boardPageContentMainTodoCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainTodoCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainTodoCard">
                            <Card/>
                            </div> */}

                        </div>
                    </div>

        {/* In Progress */}

        <div className="boardPageContentMainInProgress">
                        <div className="boardPageContentMainInProgressHeader">
                            <p id = "boardPageContentMainInProgressHeaderTitle">In progress</p>
                            <ContentCopyIcon/>
                        </div>

                        <div className="boardPageContentMainInProgressCardList">
                            <div className="boardPageContentMainInProgressCard">
                            <Card/>
                            </div>

                           

                        </div>
                    </div>

        {/* Done */}
        

        <div className="boardPageContentMainDone">
                        <div className="boardPageContentMainDoneHeader">
                            <p id = "boardPageContentMainDoneHeaderTitle">Done</p>
                            <ContentCopyIcon/>
                        </div>

                        <div className="boardPageContentMainDoneCardList">
                            <div className="boardPageContentMainDoneCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainDoneCard">
                            <Card/>
                            </div>

                            {/* <div className="boardPageContentMainDoneCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainDoneCard">
                            <Card/>
                            </div>

                            <div className="boardPageContentMainDoneCard">
                            <Card/>
                            </div> */}

                        </div>
                    </div>

                    

                </div>
            </div>
        </div>
    </>
})