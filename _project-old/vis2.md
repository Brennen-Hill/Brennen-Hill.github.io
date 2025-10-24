---
layout: page
title: "Vision Representations 2"
description: Representation Fine-Tuning for Vision-Language Models.
img: assets/img/12.jpg
importance: 1
category: research
related_publications: false
toc:
  sidebar: left
---

# Representation Fine-Tuning for Vision-Language Models

Brennen Hill, Albert Ge, Chapin Pyne, Arnav Sharma, Karl Vachuska
<br>
University of Wisconsin-Madison

---

**Abstract**

While finetuning large vision-language models has proven effective for various downstream tasks, it often requires modifying a substantial portion of model parameters. In this work, we investigate representation finetuning (ReFT) as a parameter-efficient alternative to traditional finetuning approaches. Using spatial reasoning as a benchmark task, we demonstrate that ReFT can match the performance of conventional finetuning methods while reducing the number of tunable parameters by an order of magnitude. Through comparative experiments with baseline models like nanoLlaVA, we show that our ReFT approach achieves comparable accuracy on spatial understanding tasks despite its significantly smaller parameter footprint. Our findings suggest that targeted representation finetuning offers a promising direction for efficient model adaptation, potentially enabling more resource-conscious approaches to vision-language model specialization.

---

## 1. Introduction

The rapid advancement of large pre-trained models has revolutionized machine learning, yet adapting these models to downstream tasks often requires substantial compute resources. Parameter-efficient fine-tuning seeks to mitigate this problem by introducing a limited set of tunable parameters while keeping the base model frozen. Methods like low-rank adaption {% cite hu2021loralowrankadaptationlarge %} and prompt tuning {% cite lester2021powerscaleparameterefficientprompt %} have shown promise in reducing the computational overhead of model adaptation, but they still require careful design choices about where and how to insert these trainable components.

Recently, representation fine-tuning {% cite wu2024reft %} has been introduced as a method of adapting pre-trained models by modifying their internal representations rather than directly altering their existing parameters. Traditional fine-tuning approaches often proceed by freezing some layers of a model while continuing to update the weights of other layers. Although this method can sometimes yield performance gains, it is frequently inefficient and may require extensive computational resources, as the underlying model weights are re-trained. In contrast, representation fine-tuning proposes an alternative paradigm. Instead of modifying the original model parameters, certain nodes or layers—often referred to as “representation points” within the model’s architecture—are identified, and a function is inserted at these points. This function takes as input the original hidden representation at that node and outputs a new transformed representation. Crucially, the parameters of this newly introduced function are trained, while the original model weights remain unchanged. This decouples representation adaptation from direct weight updates, potentially leading to more efficient and targeted improvements.

Such a technique has already shown promise in the context of large language models {% cite wu2024reft %}, where researchers demonstrated that representation fine-tuning can guide models to better capture certain desired attributes, improve interpretability, and potentially address emergent behaviors. Despite these advances, the application of representation fine-tuning to vision-language models—complex architectures that fuse visual and linguistic inputs—has not yet been fully explored. Introducing representation fine-tuning to this domain could enable more granular control over how these models represent and integrate multimodal data, potentially leading to improvements in tasks such as image captioning, visual question answering, and multimodal reasoning.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/vis-reft/spacial_perception.png" title="Figure 1" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Figure 1. Comparison of spatial depth perception before and after finetuning. nanoLlaVA out of the box answers this question incorrectly, but nanoLlaVA + ReFT produces the correct answer.
</div>

In this paper, we apply the ReFT framework to multimodal architectures, demonstrating its effectiveness beyond language-only models. In Figure 1, we illustrate the result of ReFT tuning a vision-language model on CV-Bench {% cite tong2024cambrian1fullyopenvisioncentric %}, a spatial reasoning task. Our contributions are summarized as follows:

- We provide empirical evidence that representation fine-tuning can achieve performance comparable to traditional fine-tuning approaches while modifying at least an order of magnitude fewer parameters.

Altogether, our work provides a foundation for more resource-efficient adaptation of vision-language models and suggests promising directions for future research in parameter-efficient model tuning.

We organize the rest of the paper as follows. Section 2 reviews the related work, situating our approach within the existing literature on parameter-efficient fine-tuning and representation engineering. Section 3 details our technical approach, including the experimental framework and model configurations. In Section 4, we present the results of our experiments, comparing ReFT with LoRA and full fine-tuning in terms of both performance and parameter efficiency. Section 5 discusses the implications of our findings, highlighting key takeaways and directions for future research.

## 2. Related Work

{% cite barack2021two %} discuss two influential perspectives on understanding cognition in cognitive science. The first, the Sherringtonian view, describes cognition as a direct consequence of node-to-node connections within neural circuits. While this bottom-up perspective has its merits, it struggles to explain complex cognitive phenomena that emerge from intricate patterns of interaction. In contrast, the Hopfieldian view emphasizes cognition as the product of high-dimensional representational spaces, formed from activity patterns across populations of neurons. This top-down view offers a richer framework for explaining higher-level cognitive processes and captures complexities that the Sherringtonian view cannot.

These differing perspectives have parallels in machine learning research. Motivated by the Hopfieldian view, various studies focus on understanding or manipulating the representational spaces within artificial neural networks, rather than studying individual neurons or parameters in isolation. Representation engineering, including representation fine-tuning, has gained attention in recent work on large language models {% cite wu2024reft,zou2023representation %}, aiming to understand and shape their internal representations to achieve desired behaviors.

{% cite wu2024reft %}, for example, undertakes the ambitious goal of laying the foundations for a 'cognitive science of AI'. By abstracting away from low-level details such as individual neurons and their synaptic connections,the authors argue for a more conceptual understanding of neural networks, drawing inspiration from how the Hopfieldian perspective interprets biological cognition. They leverage representation engineering to work top-down, analyzing patterns of activation within the model’s latent spaces. By doing so, they show it is possible not only to understand these large language models more deeply but also to modify them in targeted ways, enhancing attributes like honesty. Their findings suggest that by editing internal representations, one can steer model outputs effectively without overhauling the entire model.

In {% cite wu2024reft %}, the authors introduce a specific representation fine-tuning technique called LoReFT (Low-rank Linear Subspace ReFT). Let us consider a hidden-state representation $h$ within the model. Suppose we have two inputs, $b$ and $ s $, that produce hidden representations $ h_b $ and $ h_s $ at a particular node or layer of the model. Let $ R \in \mathbb{R}^{r \times d} $ be a low-rank projection matrix with orthonormal rows, where $ d $ is the dimensionality of the hidden representation and $ r \leq d $ is the rank of the subspace on which we intervene. We define a linear projection $ W \in \mathbb{R}^{r \times d} $ and a bias vector $ b \in \mathbb{R}^r $. The LoReFT transformation can be expressed as:

$$
\phi_{\text{LoReFT}}(h) = h + R^T(W h + b - R h).
$$

Here, the learned parameters $\phi = \{R, W, b\}\ $ are adjusted during training, while the original parameters of the model remain frozen. This top-down editing of the representation provides a powerful means to guide the model toward new behaviors, aligning its outputs with desired targets by carefully intervening within a specific subspace of its hidden representations.

In the realm of vision-language models, related ideas exist but are often still tied to weight modifications. For example, {% cite gandikota2023erasing,gandikota2024unified %} explore editing concepts within diffusion models, a form of generative model that can produce images conditioned on textual prompts. Although the general goal—manipulating internal model concepts—is similar in spirit to representation engineering, their approach differs in one key aspect: rather than leaving model weights intact, they fine-tune these weights to either remove or refine certain concepts.

<div class="row">
<div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/vis-reft/latex/loReftDiagram.png" title="Figure 2" class="img-fluid rounded z-depth-1" %}
</div>
</div>
<div class="caption">
Figure 2. Depicted on the left panel is an intervention $ I $, in which the intervention function $ \phi $ is applied to the hidden representations in layer $ l $ at position $ p $. Depicted in the right panel is the intervention function that LoReFT makes use of. It finds an edit vector which modifies the representation (and not the weights) in the linear subspace that is spanned by the rows of R {% cite wu2024reft %}.
</div>

{% cite gandikota2023erasing %} introduces a strategy known as Unified Concept Editing (UCE), enabling the correction of arbitrary issues (such as offensive content, copyright violations, or harmful biases) without requiring additional training data. By providing prompts that indicate which concepts to remove or preserve, UCE can directly manipulate the model’s conceptual space. This approach relies on modifying the model’s weights to permanently remove unwanted concepts, effectively enforcing representational constraints from within.

Similarly, {% cite gandikota2024unified %} focuses on selectively erasing concepts from text-to-image diffusion models. Instead of retraining from scratch, the authors fine-tune weights at crucial points in the model to remove concepts like artistic styles or explicit content. This is achieved by applying fine-tuning to either cross-attention layers (to target concept-specific prompts) or unconditional layers (for global erasure). Through guided negative supervision and adjustments to internal model weights, the model can be nudged away from generating undesired concepts while preserving overall fidelity. This permanent weight-based modification contrasts with representation fine-tuning, which aims to flexibly steer model outputs by adjusting learned functions that operate on existing representations, leaving the original weights untouched.

In summary, while there is a growing body of research on modifying internal representations within neural models—both in language and vision domains—current approaches to editing vision-language models often still depend on direct parameter changes. Representation fine-tuning stands as a promising, yet underexplored, alternative for vision-language models. By drawing on the Hopfieldian perspective and leveraging top-down editing of latent representations, it may be possible to create more efficient, interpretable, and controllable vision-language architectures without the computational overhead and risk of catastrophic forgetting that can accompany traditional fine-tuning methods.

<div class="row">
<div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/vis-reftlatex/ft_methods.png" title="Figure 3" class="img-fluid rounded z-depth-1" %}
</div>
</div>
<div class="caption">
Figure 3. Comparing different fine-tuning methods. Full-finetuning and low-rank adapation (LoRA) both make use of gradient-based updates to modify the parameters. Representation finetuning, on the other hand, is applied to the activations at each layer in the model.
</div>

Figure 3 presents an overview of different fine-tuning approaches. Full fine-tuning (left panel) involves editing all node weights. LoRA (middle panel) involves editing a subset of node weights in an efficient manner uses low-rank adaptations of specific layers. Distinctly, ReFT (right panel) does not involving editing node weights, but editing the representations themselves at certain layers.

## 3. Technical approach

In this study, we investigate fine-tuning and generation techniques for large language models with efficient memory utilization using quantized approaches. The methodology integrates state-of-the-art frameworks to address computational constraints while ensuring high-quality model outputs.

### Experimental Framework

Our experiments were conducted using the Hugging Face Transformers library, employing a pre-trained model nanoLLaVA <a href="[https://huggingface.co/qnguyen3/nanoLLaVA](https://huggingface.co/qnguyen3/nanoLLaVA)">1</a>, which uses the Quyen-SE <a href="[https://huggingface.co/vilm/Quyen-SE-v0.1](https://huggingface.co/vilm/Quyen-SE-v0.1)">2</a> and SigLIP as the vision encoder {% cite zhai2023sigmoid %}.

The model was fine-tuned on a CUDA-enabled environment, ensuring optimal utilization of available hardware resources. We implemented the experiments using Python 3.8 and PyTorch, leveraging the high compatibility of these frameworks with deep learning workflows.

### Tokenization and Input Processing

The tokenizer was initialized using the same pre-trained model checkpoint to ensure compatibility. The maximum sequence length was set to 2048 tokens, allowing the model to process extended contexts. A custom template was defined for user-assistant interactions:

```
<|user|>: {User Prompt}
<|assistant|>: {Assistant Response}
```

This template provided a structured input format, ensuring uniformity across training and inference phases.

### Fine-Tuning and Intervention

We developed a custom generation function, `generate`, to enable fine-grained control over the text generation process. The function facilitates:

1.  **Prompt Interventions:** Allowing modifications to the input prompt during inference.
2.  **Source Representations:** Supporting the inclusion of external sources as auxiliary input.

Future iterations of this function aim to incorporate interventions directly during the generation process to provide more dynamic control over model behavior.

### Training Environment

The fine-tuning process was executed on a GPU-accelerated system using NVIDIA's L4 architecture. All experiments utilized the PyReft library for facilitating training adjustments, alongside Accelerate and PEFT frameworks to streamline distributed training and parameter-efficient fine-tuning.

### 3.1. Training Configurations

We conducted experiments using three different fine-tuning approaches: ReFT, LoRA, and full fine-tuning. All methods shared several base hyperparameters, including a learning rate of 1e-3, single epoch training, batch size of 1, and AdamW with bfloat16 mixed precision training.

| **Param**           | **Value**     |
| :------------------ | :------------ |
| Rank                | 4             |
| Intervene Layers    | All           |
| Intervene Positions | Start/Mid/End |

Table 1. ReFT hyperparameters configuration.

| **LoRA Hyperparameter** | **Value**            |
| :---------------------- | :------------------- |
| Rank dimension (r)      | 8                    |
| Alpha scaling           | 16                   |
| Target modules          | All attention layers |

Table 2. LoRA-specific hyperparameters used in our experiments.

| **Full Fine-tuning Parameter** | **Value**            |
| :----------------------------- | :------------------- |
| Trainable parameters           | All model parameters |
| Gradient checkpointing         | Enabled              |
| Weight decay                   | 0.01                 |

Table 3. Full fine-tuning specific configuration.

ReFT (Table 1) was implemented with a smaller rank dimension of 4, as our preliminary experiments showed this was sufficient for good performance. We applied interventions across all layers of the model, with intervention positions strategically placed at the start, middle, and end of each prompt. This positioning allows ReFT to capture contextual information at critical points in the input sequence. We used a single intervention per position to maintain computational efficiency while still achieving effective adaptation.

For LoRA (Table 2), we configured the adaptation with a rank dimension of 8 and scaling factor $ \alpha=16 $. These LoRA adaptations were applied to all attention layers in the model, providing a good balance between parameter efficiency and model capacity. This configuration resulted in significantly fewer trainable parameters compared to full fine-tuning while maintaining strong performance.

For the full fine-tuning baseline (Table 3), we updated all model parameters during training. To manage the memory requirements of training the full model, we enabled gradient checkpointing. We applied a weight decay of 0.01 to help prevent overfitting, though as our results show, this approach still performed worse than the parameter-efficient methods despite having access to all model parameters.

| **Method**       | **Trainable Parameters (%)** |
| :--------------- | :--------------------------- |
| ReFT             | 0.019                        |
| LoRA             | 0.17                         |
| Full Fine-tuning | 60.99                        |

Table 4. Parameter efficiency comparison across fine-tuning methods. Both ReFT and LoRA achieve strong performance while training a tiny fraction of the model's parameters compared to full fine-tuning.

Table 4 highlights the stark differences in parameter efficiency across the three fine-tuning methods. ReFT demonstrates exceptional parameter efficiency, requiring only 0.019% of the model's parameters to be trained. This makes it the most parameter-efficient approach in our comparison, using nearly an order of magnitude fewer parameters than LoRA while achieving comparable performance.

LoRA, while still highly efficient, trains 0.17% of the model's parameters. This represents a middle ground in our comparison, requiring more parameters than ReFT but still maintaining a very small footprint compared to full fine-tuning.

Full fine-tuning updates a substantial 60.99% of the model's parameters, making it significantly more resource-intensive than both parameter-efficient methods. Despite training orders of magnitude more parameters, it achieves lower performance than both ReFT and LoRA, suggesting that more parameters do not necessarily lead to better spatial reasoning.

The training data was drawn from the CV-Bench dataset, with an 80-20 split for training and validation sets respectively.

## 4. Experimental Results

| **Fine-tuning Method** | **Validation Accuracy (%)** |
| :--------------------- | :-------------------------- |
| ReFT                   | 65.7                        |
| LoRA                   | 66.0                        |
| Full Fine-tuning       | 51.7                        |

Table 5. Comparison of different fine-tuning approaches on the CV-Bench dataset. Both parameter-efficient methods (ReFT and LoRA) significantly outperform traditional full fine-tuning.

Table 5 presents the validation accuracy achieved by each fine-tuning method on the CV-Bench dataset. Our experiments reveal several interesting findings regarding the effectiveness of different fine-tuning approaches for vision-language models.

Parameter-efficient fine-tuning methods demonstrated superior performance, with both ReFT and LoRA achieving approximately 66% accuracy on the validation set. The nearly identical performance between ReFT (65.7%) and LoRA (66.0%) suggests that both methods are equally effective at adapting the model to the multiple-choice visual question-answering task.

Surprisingly, full fine-tuning performed significantly worse, achieving only 51.7% accuracy. This substantial performance gap (approximately 14 percentage points) between parameter-efficient methods and full fine-tuning is particularly noteworthy. Given that random chance in a four-choice task would yield 25% accuracy, full fine-tuning performance, while above chance, suggests potential optimization challenges.

Several factors might explain the superior performance of parameter-efficient methods:

1.  **Catastrophic Forgetting**: Full fine-tuning may be more susceptible to catastrophic forgetting, where the model loses its pre-trained knowledge while adapting to the new task. ReFT and LoRA, by design, modify fewer parameters and may better preserve the model's pre-trained capabilities.

2.  **Optimization Stability**: Parameter-efficient methods, by updating only a subset of the model's parameters, may provide a more stable optimization landscape. This could lead to more reliable convergence during training.

3.  **Regularization Effect**: The inherent parameter constraints in ReFT and LoRA might serve as an implicit regularization mechanism, preventing overfitting to the training data.

These results suggest that parameter-efficient fine-tuning methods should be preferred over full fine-tuning for adapting vision-language models to specific tasks, offering both better performance and computational efficiency.

### 4.1. Optimizing ReFT

We also conducted experiments aiming to increase the accuracy of ReFT. We tested both what layers we intervened on and the low rank we projected onto. As before, all experiments shared used learning rate of 1e-3, single epoch training, batch size of 1, and AdamW optimizer.

The first experiment compared the impact of different ranks for the low rank projections on accuracy. We compared rank 4 to rank 14 projections. Each layer was intervened on.

Figure 4 shows that while some benefit can be gained from correctly choosing the best low rank, most of that benefit can be achieved by using a close-to-best rank. Furthermore, it shows that using a rank that is too high can severely impact performance. It should be noted that while only 1 epoch was used, loss does stagnate in that epoch. More training is unlikely to improve these less low-rank projections.

<div class="row">
<div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/vis-reft/var_low_rank_proj.png" title="Figure 4" class="img-fluid rounded z-depth-1" %}
</div>
</div>
<div class="caption">
Figure 4. Plot showing the final validation and train accuracy when varying the rank of the projection matrix. Lower rank tends to result in better evaluation performance.
</div>

When we experimented with intervening on different layers, we made the assumption that it was most important to intervene on later layers. This assumption was made because we believed that ReFT would work best with the higher-level concepts that usually appear in deeper layers. We used rank 6 projections based on our previous experiment.

We started by including only the last layer (layer 23), and then we iteratively added the layer before it. Figure 5 presents the validation and training accuracy achieved by each intervention strategy.

<div class="row">
<div class="col-sm mt-3 mt-md-0">
{% include figure.liquid loading="eager" path="assets/img/vis-reft/int_on_different_layers.png" title="Figure 5" class="img-fluid rounded z-depth-1" %}
</div>
</div>
<div class="caption">
Figure 5. Lowest layer 20 means that layers 20, 21, 22, and 23 were intervened on.
</div>

Figure 5, contrary to our assumptions, has only minor improvements with the only later interventions. Instead, there is a massive spike in accuracy when layers 15-23 are intervened on. After that, minor but steady improvement appears with each layer intervened on.

This seems to indicate that earlier interventions are more effective. Without further research, it can not be ruled out that this is a result of model architecture, dataset, or task being fine-tuned. This does seem to indicate that Reft can achieve its full effectiveness with only limited interventions, which allow for even fewer parameters to be trained.

However, with our current understanding of ReFT, we are unable to realize those computation savings as we don't know how to figure out this hyper-parameter selection without computationally expensive testing. This is also an issue when figuring out which low-rank projection should be used, especially when considering that different layers likely have different optimal ranks for their low-rank projections.

## 5. Conclusion

Prior research {% cite wu2024reft %} has demonstrated ReFT to be a highly parameter-efficient approach for fine-tuning language models with minimal efficiency-performance trade-off. In this paper, we expand ReFT to vision-language models, finding similarly that it can achieve comparable accuracy on spatial understanding tasks with much better parameter efficiency relative to alternative approaches.

While ReFT shows promise as a fine-tuning method, particularly for enhancing spatial understanding in pre-trained vision models, there is still room to improve its performance relative to existing approaches like LoRA. Future work may further improve ReFT performance in vision-language models by incorporating interventions directly during the generation process, providing more dynamic control over model behavior. Future work could also make ReFT even less computationally expensive through increase understanding of where to intervene and how to select the rank of projections.

## References

Barack, David L and John W Krakauer (2021). "Two views on the cognitive brain". In: _Nature Reviews Neuroscience_ 22.6, pp. 359-371.

Gandikota, Rohit, Joanna Materzyńska, et al. (2023). "Erasing Concepts from Diffusion Models". In: _Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)_, pp. 2426-2436. URL: [https://openaccess.thecvf.com/content/ICCV2023/papers/Gandikota_Erasing_Concepts_from_Diffusion_Models_ICCV_2023_paper.pdf](https://openaccess.thecvf.com/content/ICCV2023/papers/Gandikota_Erasing_Concepts_from_Diffusion_Models_ICCV_2023_paper.pdf).

Gandikota, Rohit, Hadas Orgad, et al. (2024). "Unified Concept Editing in Diffusion Models". In: _Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)_. URL: [https://unified.baulab.info/](https://unified.baulab.info/).

Hu, Edward J. et al. (2021). _LORA: Low-Rank Adaptation of Large Language Models_. arXiv: 2106.09685 [cs.CL]. URL: [https://arxiv.org/abs/2106.09685](https://arxiv.org/abs/2106.09685).

Lester, Brian, Rami Al-Rfou, and Noah Constant (2021). _The Power of Scale for Parameter-Efficient Prompt Tuning_. arXiv: 2104.08691 [cs.CL]. URL: [https://arxiv.org/abs/2104.08691](https://arxiv.org/abs/2104.08691).

Tong, Shengbang et al. (2024). _Cambrian-1: A Fully Open, Vision-Centric Exploration of Multimodal LLMs_. arXiv: 2406.16860 [cs.CV]. URL: [https://arxiv.org/abs/2406.16860](https://arxiv.org/abs/2406.16860).

Wu, Zhengxuan et al. (2024). "ReFT: Representation Finetuning for Language Models". In: _arXiv preprint arXiv:2404.03592_. URL: [https://arxiv.org/abs/2404.03592](https://arxiv.org/abs/2404.03592).

Zhai, Xiaohua et al. (2023). _Sigmoid Loss for Language Image Pre-Training_. arXiv: 2303.15343 [cs.CV].

Zou, Andy et al. (2023). "Representation Engineering: A Top-Down Approach to AI Transparency". In: _arXiv preprint arXiv:2310.01405_. URL: [https://arxiv.org/abs/2310.01405](https://arxiv.org/abs/2310.01405).

$$
$$
