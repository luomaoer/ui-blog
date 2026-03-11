<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <div class="docs-example-showcase">
        <AppAsyncComponent />
      </div>
      <el-divider class="m-0" />

      <div class="docs-example-btns">
        <el-tooltip content="复制代码">
          <el-icon :size="size" class="op-btn">
            <CopyDocument v-copy="content" />
          </el-icon>
        </el-tooltip>
        <el-tooltip :content="show ? '收起源代码' : '查看源代码'">
          <el-icon :size="size" @click="handleToggle" class="op-btn">
            <View />
          </el-icon>
        </el-tooltip>
      </div>
      <ElCollapseTransition>
        <div v-show="show" class="docs-example-language-vue language-vue">
          <div class="content">
            <highlightjs language="js" :code="decoded"></highlightjs>
          </div>
          <div class="line-numbers-wrapper">
            <template v-for="item in total" :key="item">
              <span class="line-number">
                {{ item }}
              </span>
              <br />
            </template>
          </div>
        </div>
      </ElCollapseTransition>
      <Transition name="el-fade-in-linear">
        <div v-show="show" class="example-float-control" @click="handleToggle">
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, computed } from "vue"
import { CopyDocument, View, CaretTop } from "@element-plus/icons-vue"
import { getComponent } from "../../utils/getComponent"

// 自动加载 asyncRouter 文件夹下所有的异步路由
const moduleFiles = import.meta.glob("../../../examples/**/*.vue", {
  eager: true
})

const props = defineProps({
  source: String,
  path: String,
  rawSource: String,
  description: String
})

const show = ref(false)
const total = ref(0)
const size = 16

const AppAsyncComponent = getComponent(moduleFiles, props.path)

const decodedDescription = computed(() => decodeURIComponent(props.description))



const handleToggle = () => {
  show.value = !show.value
}

const decoded = computed(() => decodeURIComponent(props.source))
const content = computed(() => decodeURIComponent(props.rawSource))


// add line-number
const tem = content.value.split("\r\n")
total.value = tem.length

</script>

<style lang="scss" scoped>
.example {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  margin-top: 10px;

  .docs-example-showcase {
    background-color: var(--el-bg-color-page);

    .t_module_form_demo {
      background-color: var(--el-bg-color-page);

      :deep(.t_layout_page_item) {
        padding: 0;

        .t_module_form {
          overflow: hidden;
          margin: 0 !important;

          .handle_wrap {
            position: inherit;
          }
        }
      }
    }
  }

  .m-0 {
    margin: 0;
  }

  .docs-example-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--el-border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--el-bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .content {
    padding-left: 32px;
  }

  .line-numbers-wrapper {
    border-color: #dcdfe6;
    line-height: 1.4;
    padding-top: 11px;
    user-select: none;

    .line-number {
      color: #aaa;
      line-height: 1.4;
    }
  }
}
</style>
