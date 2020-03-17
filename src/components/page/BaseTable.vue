<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    @click="handleAdd">
                    <i class="el-icon-lx-add" style="font-size: 15px;">新增</i>
                </el-button>
                
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" v-if="false" ></el-table-column>
                <el-table-column prop="name" label="Name" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)"
                        >{{scope.row.name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="createdOn" label="创建时间"></el-table-column>
                <el-table-column prop="lastModifiedOn" label="最后修改时间"></el-table-column>
                <el-table-column prop="active" label="状态" width="65" align="center">
                    <template slot-scope="scope">
                        <el-tag 
                            :type="scope.row.active==true?'success':'danger'"
                        >{{scope.row.active}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="syncon" label="syncon"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button> -->
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total,prev, pager, next"
                    :current-page="query.page"
                    :page-size="query.pageCount"
                    :total="pageTotal"
                    @current-change="handlePageChange">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item v-if="false" >
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="form.createdOn"
                        type="datetime"
                        format="yyyy年MM月dd日 HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                        align="right">
                    </el-date-picker>
                    <!-- <el-input v-model="form.createdOn"></el-input> -->
                </el-form-item>
                <el-form-item label="最后修改时间">
                    <el-date-picker
                        v-model="form.lastModifiedOn"
                        type="datetime"
                        format="yyyy年MM月dd日 HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                        align="right">
                    </el-date-picker>
                    <!-- <el-input v-model="form.lastModifiedOn"></el-input> -->
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch
                        v-model="form.active"
                        active-text="启用"
                        inactive-text="禁用">
                    </el-switch>
                    <!-- <el-input v-model="form.active"></el-input> -->
                </el-form-item>
                <el-form-item label="syncon">
                    <el-date-picker
                        v-model="form.syncon"
                        type="datetime"
                        format="yyyy年MM月dd日 HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                        align="right">
                    </el-date-picker>
                    <!-- <el-input v-model="form.syncon"></el-input> -->
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="addform" label-width="70px">
                <el-form-item label="guid" >
                    <el-input v-model="addform.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="addform.createdOn"
                        type="datetime"
                        format="yyyy年MM月dd日 HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                        align="right">
                    </el-date-picker>
                    <!-- <el-input v-model="form.createdOn"></el-input> -->
                </el-form-item>
                <el-form-item label="最后修改时间">
                    <el-date-picker
                        v-model="addform.lastModifiedOn"
                        type="datetime"
                        format="yyyy年MM月dd日 HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                        align="right">
                    </el-date-picker>
                    <!-- <el-input v-model="form.lastModifiedOn"></el-input> -->
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch
                        v-model="addform.active"
                        active-text="启用"
                        inactive-text="禁用">
                    </el-switch>
                    <!-- <el-input v-model="form.active"></el-input> -->
                </el-form-item>
                <el-form-item label="syncon">
                    <el-date-picker
                        v-model="addform.syncon"
                        type="datetime"
                        format="yyyy年MM月dd日 HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                        align="right">
                    </el-date-picker>
                    <!-- <el-input v-model="form.syncon"></el-input> -->
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import { saveData } from '../../api/index';
import { delData } from '../../api/index';
import { addData } from '../../api/index';
import { getGuid } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                name: '',
                page: 1,
                pageCount: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            addform: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetchData(this.query).then(res => {
                res.records.forEach(element => {
                    var time = element.createdOn
                    element.createdOn=element.createdOn.split('T')[0]
                    element.createdOn+=' ' + time.split('T')[1].split('.')[0]
                    time = element.lastModifiedOn
                    element.lastModifiedOn=element.lastModifiedOn.split('T')[0]
                    element.lastModifiedOn+=' ' + time.split('T')[1].split('.')[0]
                    time = element.syncon
                    element.syncon=element.syncon.split('T')[0]
                    element.syncon+=' ' + time.split('T')[1].split('.')[0]
                });
                this.tableData = res.records;
                this.pageTotal = res.total || 50;
                this.query.page = res.current;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    delData(row.id).then(res => {
                        if(res.status.code=="200"){
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        }else{ 
                            this.$message.error('删除失败');
                        }
                    });
                    
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            let numlist=[];
            for (let i = 0; i < length; i++) {
                numlist.push(this.multipleSelection[i].index)
                delData(this.multipleSelection[i].id).then(res => {
                        if(res.status.code=="200"){
                            this.$message.warning(`已删除`);
                            // this.tableData.splice(this.multipleSelection[i].index, 1);
                        }else{ 
                            this.$message.error('删除失败');
                        }
                    });
            }
            numlist.forEach(element => {
                this.tableData.splice(element, 1);
            });
            // this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 新增操作
        handleAdd() {
            this.addVisible = true;
            this.$set(this.addform, 'active', true);
            this.$set(this.addform, 'createdOn', new Date());
            this.$set(this.addform, 'lastModifiedOn', new Date());
            this.$set(this.addform, 'syncon', new Date());
            getGuid().then(res=>{
                this.$set(this.addform, 'id', res);
            })
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            saveData(this.form).then(res => {
                if(res==1){
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                }else{ 
                    this.$message.error(`修改第 ${this.idx + 1} 行失败`);
                }
            });
            this.$set(this.tableData, this.idx, this.form);
        },
        // 新增编辑
        addEdit() {
            this.addVisible = false;
            addData(this.addform).then(res => {
                if(res==1){
                    this.$message.success(`添加成功`);
                    this.getData();
                }
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
